export async function onRequest(context) {
    const { request, env } = context;
    const method = request.method;

    if (method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const data = await request.json();
        
        if (data.action === 'save_state') {
            const { roomCode, state } = data;
            
            if (!roomCode || typeof roomCode !== 'string') {
                return new Response(JSON.stringify({ error: 'Invalid room code' }), { status: 400 });
            }

            // Create states table if it doesn't exist
            try {
                await env.DB.prepare(`CREATE TABLE IF NOT EXISTS room_states (room_code TEXT PRIMARY KEY, state TEXT)`).run();
            } catch (e) {
                // Ignore create table errors
            }

            // Ensure room exists in rooms table
            await env.DB.prepare(`INSERT OR IGNORE INTO rooms (room_code, password) VALUES (?, ?)`).bind(roomCode, null).run();

            const stateStr = JSON.stringify(state);
            const existingState = await env.DB.prepare(`SELECT * FROM room_states WHERE room_code = ?`).bind(roomCode).first();
            if (existingState) {
                await env.DB.prepare(`UPDATE room_states SET state = ? WHERE room_code = ?`).bind(stateStr, roomCode).run();
            } else {
                await env.DB.prepare(`INSERT INTO room_states (room_code, state) VALUES (?, ?)`).bind(roomCode, stateStr).run();
            }

            return new Response(JSON.stringify({ success: true }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
