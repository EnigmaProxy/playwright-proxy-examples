from playwright.sync_api import sync_playwright

MAX_RETRIES = 3

proxy = {
    "server": "http://resi.enigmaproxy.net:12321",
    "username": "USERNAME",
    "password": "PASSWORD"
}

def browse(url):

    for attempt in range(1, MAX_RETRIES + 1):

        with sync_playwright() as p:

            browser = p.chromium.launch(
                headless=True,
                proxy=proxy
            )

            try:

                print(f"Attempt {attempt}/{MAX_RETRIES}")

                page = browser.new_page()

                page.goto(
                    url,
                    wait_until="networkidle",
                    timeout=30000
                )

                print(page.locator("body").text_content())

                browser.close()

                return

            except Exception:

                print(f"Attempt {attempt} failed")

                browser.close()

                if attempt == MAX_RETRIES:
                    raise

browse("https://httpbin.org/ip")