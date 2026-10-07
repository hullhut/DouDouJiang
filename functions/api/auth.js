export async function onRequest(context) {
    const { request, env } = context;
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });

    try {
        const data = await request.json();
        const { action, username, password } = data;

        if (!username || !password) {
            return new Response(JSON.stringify({ error: 'Missing username or password' }), { status: 400 });
        }

        // Hash password
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        if (action === 'register') {
            try {
                await env.DB.prepare(
                    `INSERT INTO users (username, password_hash) VALUES (?, ?)`
                ).bind(username, passwordHash).run();
                return new Response(JSON.stringify({ success: true, message: 'Registered successfully' }));
            } catch (e) {
                if (e.message.includes('UNIQUE constraint failed')) {
                    return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 400 });
                }
                throw e;
            }
        } else if (action === 'login') {
            const user = await env.DB.prepare(
                `SELECT * FROM users WHERE username = ? AND password_hash = ?`
            ).bind(username, passwordHash).first();

            if (user) {
                // Return simple token (username for now, since it's a basic app)
                return new Response(JSON.stringify({ success: true, token: username }));
            } else {
                return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
            }
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
    
    return new Response('Not found', { status: 404 });
}
