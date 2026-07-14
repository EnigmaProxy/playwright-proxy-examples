from playwright.sync_api import sync_playwright

proxy = {
    "server": "http://resi.enigmaproxy.net:12321",

    # Change this to target different locations
    "username": "USERNAME_country-us",

    "password": "PASSWORD"
}

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=True,
        proxy=proxy
    )

    try:

        page = browser.new_page()

        print("Checking location...")

        page.goto(
            "https://httpbin.org/ip",
            wait_until="networkidle"
        )

        print(page.locator("body").text_content())

    finally:

        browser.close()