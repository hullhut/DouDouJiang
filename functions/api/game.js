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

            // Ensure room exists
            const room = await env.DB.prepare(`SELECT * FROM rooms WHERE room_code = ?`).bind(roomCode).first();
            if (!room) {
                await env.DB.prepare(`INSERT INTO rooms (room_code, password) VALUES (?, ?)`).bind(roomCode, null).run();
            }

            // Ensure state column exists
            try {
                await env.DB.prepare(`SELECT state FROM rooms LIMIT 1`).first();
            } catch (e) {
                // Column doesn't exist, add it
                await env.DB.prepare(`ALTER TABLE rooms ADD COLUMN state TEXT`).run();
            }

            await env.DB.prepare(`UPDATE rooms SET state = ? WHERE room_code = ?`)
                .bind(JSON.stringify(state), roomCode)
                .run();

            return new Response(JSON.stringify({ success: true }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }

    return new Response('Not found', { status: 404 });
}
