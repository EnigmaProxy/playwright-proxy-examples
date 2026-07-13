const { chromium } = require("playwright");

// Replace these with your proxy credentials
const PROXY_HOST = "resi.enigmaproxy.net";
const PROXY_PORT = "32325";
const USERNAME = "USERNAME";
const PASSWORD = "PASSWORD";

(async () => {

    const browser = await chromium.launch({

        headless: true,

        proxy: {

            server: `socks5://${PROXY_HOST}:${PROXY_PORT}`,

            username: USERNAME,

            password: PASSWORD

        }

    });

    try {

        const page = await browser.newPage();

        console.log("Checking SOCKS5 proxy...");

        await page.goto("https://httpbin.org/ip", {
            waitUntil: "networkidle"
        });

        const body = await page.locator("body").textContent();

        console.log(body);

    } catch (error) {

        console.error(error);

    } finally {

        await browser.close();

    }

})();