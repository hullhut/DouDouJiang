const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: 'C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data',
        headless: false,
        defaultViewport: null
    });

    const page = await browser.newPage();
    console.log("Navigating to Cloudflare...");
    await page.goto('https://dash.cloudflare.com/', { waitUntil: 'networkidle2' });
    
    // Check if logged in by looking for something on the dashboard
    console.log("Checking login status...");
    
    // We would need to click around, but without knowing the exact DOM, it's risky.
    // I will just print the title.
    const title = await page.title();
    console.log("Page title:", title);
    
    // Wait a bit to observe
    await new Promise(r => setTimeout(r, 5000));
    
    await browser.close();
})();
