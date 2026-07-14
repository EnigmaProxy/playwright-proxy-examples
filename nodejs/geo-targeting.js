const { chromium } = require("playwright");

const proxy = {
    server: "http://resi.enigmaproxy.net:12321",

    // Change this to target different locations
    username: "USERNAME_country-us",

    password: "PASSWORD"
};

(async () => {

    const browser = await chromium.launch({
        headless: true,
        proxy
    });

    try {

        const page = await browser.newPage();

        console.log("Checking location...");

        await page.goto("https://httpbin.org/ip", {
            waitUntil: "networkidle"
        });

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

})();