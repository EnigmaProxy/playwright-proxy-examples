from playwright.sync_api import sync_playwright
import secrets

session = secrets.token_hex(4)

examples = {

    "random": f"USERNAME_session-{session}",

    "country": f"USERNAME_country-us_session-{session}",

    "state": f"USERNAME_country-us_state-california_session-{session}",

    "city": f"USERNAME_country-us_state-california_city-losangeles_session-{session}",

    "international": f"USERNAME_country-sa_state-alhududashshamaliyah_city-arar_session-{session}"

}

username = examples["country"]

proxy = {

    "server": "http://resi.enigmaproxy.net:12321",

    "username": username,

    "password": "PASSWORD"

}

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=True,
        proxy=proxy
    )

    try:

        page = browser.new_page()

        print(f"Sticky Session ID: {session}")
        print(f"Username: {username}")

        page.goto(
            "https://httpbin.org/ip",
            wait_until="networkidle"
        )

        print(page.locator("body").text_content())

    finally:

        browser.close()