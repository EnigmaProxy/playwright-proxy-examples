const { chromium } = require("playwright");

const proxies = [

    {
        name: "Random",
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME",
        password: "PASSWORD"
    },

    {
        name: "United States",
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME_country-us",
        password: "PASSWORD"
    },

    {
        name: "Germany",
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME_country-de",
        password: "PASSWORD"
    }

];

async function launch(proxy) {

    const browser = await chromium.launch({

        headless: true,

        proxy

    });

    try {

        const page = await browser.newPage();

        await page.goto("https://httpbin.org/ip", {

            waitUntil: "networkidle"

        });

        console.log(`\n=== ${proxy.name} ===`);

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

}

(async () => {

    await Promise.all(

        proxies.map(proxy => launch(proxy))

    );

})();