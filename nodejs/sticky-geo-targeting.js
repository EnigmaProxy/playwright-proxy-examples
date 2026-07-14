const { chromium } = require("playwright");
const crypto = require("crypto");

// Generate random 8-character session ID
const session = crypto.randomBytes(4).toString("hex");

const examples = {

    // Random Country
    random: `USERNAME_session-${session}`,

    // Country
    country: `USERNAME_country-us_session-${session}`,

    // US State
    state: `USERNAME_country-us_state-california_session-${session}`,

    // US City
    city: `USERNAME_country-us_state-california_city-losangeles_session-${session}`,

    // International City
    international: `USERNAME_country-sa_state-alhududashshamaliyah_city-arar_session-${session}`

};

// Change this
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

        console.log(`Sticky Session ID: ${session}`);
        console.log(`Username: ${username}`);

        await page.goto("https://httpbin.org/ip", {

            waitUntil: "networkidle"

        });

        console.log(await page.locator("body").textContent());

    } finally {

        await browser.close();

    }

})();