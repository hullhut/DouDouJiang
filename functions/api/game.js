export async function onRequest(context) {
    const { request, env } = context;
    const method = request.method;

    if (method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const data = await request.json();
        
        if (data.action === 'save_state') {
            const { roomCode, state, password } = data;
            
            if (!roomCode || typeof roomCode !== 'string') {
                return new Response(JSON.stringify({ error: 'Invalid room code' }), { status: 400 });
            }

            // Verify room password if room is protected
            const room = await env.DB.prepare(`SELECT password FROM rooms WHERE room_code = ?`).bind(roomCode).first();
            if (room && room.password) {
                if (!password) {
                    return new Response(JSON.stringify({ error: 'Password required' }), { status: 401 });
                }
                const encoder = new TextEncoder();
                const dataBuffer = encoder.encode(password);
                const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const providedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                
                if (providedHash !== room.password) {
                    return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
                }
            }

            // Ensure room exists in rooms table
            await env.DB.prepare(`INSERT OR IGNORE INTO rooms (room_code, password) VALUES (?, ?)`).bind(roomCode, null).run();

            // UPSERT state
            const stateStr = JSON.stringify(state);
            await env.DB.prepare(
                `INSERT INTO room_states (room_code, state) VALUES (?, ?) ON CONFLICT(room_code) DO UPDATE SET state = excluded.state`
            ).bind(roomCode, stateStr).run();

            return new Response(JSON.stringify({ success: true }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
