const { chromium } = require("playwright");
const crypto = require("crypto");

// Generate a random 8-character hexadecimal session ID
const session = crypto.randomBytes(4).toString("hex");

(async () => {

    const browser = await chromium.launch({

        headless: true,

        proxy: {

            server: "http://resi.enigmaproxy.net:12321",

            username: `USERNAME_session-${session}`,

            password: "PASSWORD"

        }

    });

    try {

        const page = await browser.newPage();

        console.log(`Sticky Session: ${session}`);

        await page.goto("https://httpbin.org/ip", {
            waitUntil: "networkidle"
        });

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

})();