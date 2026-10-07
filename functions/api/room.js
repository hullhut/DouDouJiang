export async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const method = request.method;

    try {
        if (method === 'POST') {
            const data = await request.json();
            
            // Set or update room password (Notepad style)
            if (data.action === 'set_password') {
                const { roomCode, password } = data;
                if (!roomCode || !password) {
                    return new Response(JSON.stringify({ error: 'Missing code or password' }), { status: 400 });
                }

                const encoder = new TextEncoder();
                const dataBuffer = encoder.encode(password);
                const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

                // Use UPSERT to prevent race conditions
                await env.DB.prepare(`INSERT INTO rooms (room_code, password) VALUES (?, ?) ON CONFLICT(room_code) DO UPDATE SET password = excluded.password`).bind(roomCode, passwordHash).run();

                return new Response(JSON.stringify({ success: true }));
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
                // Notepad style: room doesn't exist yet, it's just empty and unpassworded
                return new Response(JSON.stringify({ success: true, isNew: true, games: [] }), {
                    headers: { 'Content-Type': 'application/json' }
                });
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

            // Fetch state from room_states table
            let roomState = null;
            try {
                const stateRow = await env.DB.prepare(`SELECT state FROM room_states WHERE room_code = ?`).bind(roomCode).first();
                if (stateRow && stateRow.state) {
                    roomState = JSON.parse(stateRow.state);
                }
            } catch (e) {
                // If table doesn't exist, ignore
            }
            
            if (roomState) {
                room.state = roomState;
            }

            return new Response(JSON.stringify({ success: true, room, games: results }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
