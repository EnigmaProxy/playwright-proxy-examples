from playwright.sync_api import sync_playwright

examples = {

    # Random country
    "random": "USERNAME",

    # Country
    "country": "USERNAME_country-us",

    # US State
    "state": "USERNAME_country-us_state-california",

    # US City
    "city": "USERNAME_country-us_state-california_city-losangeles",

    # Non-US City
    "international": "USERNAME_country-sa_state-alhududashshamaliyah_city-arar"

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

        print(f"Using proxy: {username}")

        page.goto(

            "https://httpbin.org/ip",

            wait_until="networkidle"

        )

        print(page.locator("body").text_content())

    finally:

        browser.close()