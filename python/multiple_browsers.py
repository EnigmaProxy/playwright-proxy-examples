from playwright.sync_api import sync_playwright
from concurrent.futures import ThreadPoolExecutor

proxies = [

    {
        "name": "Random",
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME",
        "password": "PASSWORD"
    },

    {
        "name": "United States",
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME_country-us",
        "password": "PASSWORD"
    },

    {
        "name": "Germany",
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME_country-de",
        "password": "PASSWORD"
    }

]

def browse(proxy):

    with sync_playwright() as p:

        browser = p.chromium.launch(

            headless=True,

            proxy={

                "server": proxy["server"],
                "username": proxy["username"],
                "password": proxy["password"]

            }

        )

        try:

            page = browser.new_page()

            page.goto(

                "https://httpbin.org/ip",

                wait_until="networkidle"

            )

            print(f"\n=== {proxy['name']} ===")

            print(page.locator("body").text_content())

        finally:

            browser.close()

with ThreadPoolExecutor(max_workers=len(proxies)) as executor:

    executor.map(browse, proxies)