const { chromium } = require("playwright");

const proxies = [

    {
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME",
        password: "PASSWORD"
    },

    {
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME_country-us",
        password: "PASSWORD"
    },

    {
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME_country-gb",
        password: "PASSWORD"
    },

    {
        server: "http://resi.enigmaproxy.net:12321",
        username: "USERNAME_country-de",
        password: "PASSWORD"
    }

];

const proxy = proxies[Math.floor(Math.random() * proxies.length)];

(async () => {

    const browser = await chromium.launch({

        headless: true,

        proxy

    });

    try {

        const page = await browser.newPage();

        console.log("Selected Proxy:");
        console.log(proxy.username);

        await page.goto("https://httpbin.org/ip", {

            waitUntil: "networkidle"

        });

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

})();