export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    
    // Auto-generate the notepad-style URL
    const dateStr = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 8);
    const randomCode = Math.random().toString(36).substring(2, 10);
    
    return Response.redirect(`${url.origin}/mj/${dateStr}/${randomCode}`, 302);
}
