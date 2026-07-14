const { chromium } = require("playwright");

const proxy = {
    server: "http://resi.enigmaproxy.net:12321",
    username: "USERNAME_country-us",
    password: "PASSWORD"
};

(async () => {

    const browser = await chromium.launch({
        headless: true,
        proxy
    });

    try {

        const page = await browser.newPage({

            viewport: {

                width: 1440,
                height: 900

            }

        });

        console.log("Opening website...");

        await page.goto("https://example.com", {

            waitUntil: "networkidle"

        });

        await page.screenshot({

            path: "example.png",

            fullPage: true

        });

        console.log("Screenshot saved as example.png");

    } finally {

        await browser.close();

    }

})();