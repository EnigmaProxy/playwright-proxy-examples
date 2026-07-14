const { chromium } = require("playwright");

const proxy = {
    server: "http://resi.enigmaproxy.net:12321",
    username: "USERNAME",
    password: "PASSWORD"
};

const MAX_RETRIES = 3;

async function browse(url) {

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

        const browser = await chromium.launch({
            headless: true,
            proxy
        });

        try {

            console.log(`Attempt ${attempt}/${MAX_RETRIES}`);

            const page = await browser.newPage();

            await page.goto(url, {
                waitUntil: "networkidle",
                timeout: 30000
            });

            console.log(await page.locator("body").textContent());

            await browser.close();

            return;

        } catch (err) {

            console.log(`Attempt ${attempt} failed`);

            await browser.close();

            if (attempt === MAX_RETRIES)
                throw err;

        }

    }

}

browse("https://httpbin.org/ip");