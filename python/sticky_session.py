from playwright.sync_api import sync_playwright
import secrets

session = secrets.token_hex(4)

proxy = {
    "server": "http://resi.enigmaproxy.net:12321",
    "username": f"USERNAME_session-{session}",
    "password": "PASSWORD"
}

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=True,
        proxy=proxy
    )

    try:

        page = browser.new_page()

        print(f"Sticky Session: {session}")

        page.goto(
            "https://httpbin.org/ip",
            wait_until="networkidle"
        )

        print(page.locator("body").text_content())

    finally:

        browser.close()