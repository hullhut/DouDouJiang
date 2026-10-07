export async function onRequestGet(context) {
    // Serve the main index.html for all /mj/* routes
    const url = new URL(context.request.url);
    url.pathname = "/";
    return context.env.ASSETS.fetch(new Request(url, context.request));
}
