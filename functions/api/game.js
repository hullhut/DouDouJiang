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

            // Create tables if they don't exist
            try {
                await env.DB.prepare(`CREATE TABLE IF NOT EXISTS rooms (room_code TEXT PRIMARY KEY, password TEXT)`).run();
            } catch (e) {}
            try {
                await env.DB.prepare(`CREATE TABLE IF NOT EXISTS room_states (room_code TEXT PRIMARY KEY, state TEXT)`).run();
            } catch (e) {}

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
