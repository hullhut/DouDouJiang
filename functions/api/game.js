export async function onRequest(context) {
    const { request, env } = context;
    const method = request.method;

    if (method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    try {
        const data = await request.json();
        
        if (data.action === 'save') {
            const { roomCode, gameData } = data;
            
            if (!roomCode || typeof roomCode !== 'string') {
                return new Response(JSON.stringify({ error: 'Invalid room code' }), { status: 400 });
            }
            if (!gameData || typeof gameData !== 'object' || !gameData.scores) {
                return new Response(JSON.stringify({ error: 'Malformed game data' }), { status: 400 });
            }

            // Ensure room exists (Notepad style implicit creation)
            const room = await env.DB.prepare(`SELECT * FROM rooms WHERE room_code = ?`).bind(roomCode).first();
            if (!room) {
                await env.DB.prepare(`INSERT INTO rooms (room_code, password) VALUES (?, ?)`).bind(roomCode, null).run();
            }

            const result = await env.DB.prepare(
                `INSERT INTO games (room_code, game_data) VALUES (?, ?)`
            ).bind(roomCode, JSON.stringify(gameData)).run();

            return new Response(JSON.stringify({ success: true, id: result.meta.last_row_id }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
