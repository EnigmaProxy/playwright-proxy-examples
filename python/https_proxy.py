from playwright.sync_api import sync_playwright

# Replace these with your proxy credentials
PROXY_HOST = "resi.enigmaproxy.net"
PROXY_PORT = "12321"
USERNAME = "USERNAME"
PASSWORD = "PASSWORD"

PROXY = {
    "server": f"https://{PROXY_HOST}:{PROXY_PORT}",
    "username": USERNAME,
    "password": PASSWORD
}

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=True,
        proxy=PROXY
    )

    try:

        page = browser.new_page()

        print("Checking proxy...")

        page.goto(
            "https://httpbin.org/ip",
            wait_until="networkidle"
        )

        print(page.locator("body").text_content())

    finally:

        browser.close()