export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;

    try {
        if (method === 'POST') {
            const data = await request.json();
            
            if (data.action === 'create') {
                const dateStr = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 8);
                const randomCode = Math.random().toString(36).substring(2, 10);
                const roomCode = `${dateStr}/${randomCode}`;
                let passwordHash = null;

                if (data.password) {
                    const encoder = new TextEncoder();
                    const dataBuffer = encoder.encode(data.password);
                    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
                    const hashArray = Array.from(new Uint8Array(hashBuffer));
                    passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                }

                await env.DB.prepare(
                    `INSERT INTO rooms (room_code, password) VALUES (?, ?)`
                ).bind(roomCode, passwordHash).run();

                return new Response(JSON.stringify({ success: true, roomCode }), {
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        if (method === 'GET') {
            const roomCode = url.searchParams.get('code');
            const providedPwd = url.searchParams.get('pwd');

            if (!roomCode) {
                return new Response(JSON.stringify({ error: 'Missing room code' }), { status: 400 });
            }

            const room = await env.DB.prepare(
                `SELECT * FROM rooms WHERE room_code = ?`
            ).bind(roomCode).first();

            if (!room) {
                return new Response(JSON.stringify({ error: 'Room not found' }), { status: 404 });
            }

            if (room.password) {
                if (!providedPwd) {
                    return new Response(JSON.stringify({ error: 'Password required' }), { status: 401 });
                }
                const encoder = new TextEncoder();
                const dataBuffer = encoder.encode(providedPwd);
                const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const providedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                
                if (providedHash !== room.password) {
                    return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
                }
            }

            const { results } = await env.DB.prepare(
                `SELECT * FROM games WHERE room_code = ? ORDER BY created_at ASC`
            ).bind(roomCode).all();

            return new Response(JSON.stringify({ success: true, room, games: results }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
