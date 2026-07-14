from playwright.sync_api import sync_playwright

proxy = {
    "server": "http://resi.enigmaproxy.net:12321",
    "username": "USERNAME_country-us",
    "password": "PASSWORD"
}

with sync_playwright() as p:

    browser = p.chromium.launch(

        headless=True,

        proxy=proxy

    )

    try:

        page = browser.new_page(

            viewport={

                "width": 1440,

                "height": 900

            }

        )

        print("Opening website...")

        page.goto(

            "https://example.com",

            wait_until="networkidle"

        )

        page.screenshot(

            path="example.png",

            full_page=True

        )

        print("Screenshot saved as example.png")

    finally:

        browser.close()