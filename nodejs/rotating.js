const { chromium } = require("playwright");

const examples = {

    // Random country
    random: "USERNAME",

    // Country
    country: "USERNAME_country-us",

    // US State
    state: "USERNAME_country-us_state-california",

    // US City
    city: "USERNAME_country-us_state-california_city-losangeles",

    // Non-US City
    international: "USERNAME_country-sa_state-alhududashshamaliyah_city-arar"

};

// Choose one
const username = examples.country;

(async () => {

    const browser = await chromium.launch({

        headless: true,

        proxy: {

            server: "http://resi.enigmaproxy.net:12321",

            username,

            password: "PASSWORD"

        }

    });

    try {

        const page = await browser.newPage();

        console.log(`Using proxy: ${username}`);

        await page.goto("https://httpbin.org/ip", {

            waitUntil: "networkidle"

        });

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

})();