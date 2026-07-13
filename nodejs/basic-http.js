const { chromium } = require("playwright");

(async () => {
  // Replace these with your proxy credentials
  const PROXY_HOST = "resi.enigmaproxy.net";
  const PROXY_PORT = "12321";
  const USERNAME = "USERNAME";
  const PASSWORD = "PASSWORD";

  const browser = await chromium.launch({
    headless: true,
    proxy: {
      server: `http://${PROXY_HOST}:${PROXY_PORT}`,
      username: USERNAME,
      password: PASSWORD,
    },
  });

  try {
    const page = await browser.newPage();

    console.log("Checking proxy...");

    await page.goto("https://httpbin.org/ip", {
      waitUntil: "networkidle",
    });

    const body = await page.locator("body").textContent();

    console.log("Current IP:");
    console.log(body);

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();