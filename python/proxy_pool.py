import random

from playwright.sync_api import sync_playwright

proxies = [

    {
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME",
        "password": "PASSWORD"
    },

    {
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME_country-us",
        "password": "PASSWORD"
    },

    {
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME_country-gb",
        "password": "PASSWORD"
    },

    {
        "server": "http://resi.enigmaproxy.net:12321",
        "username": "USERNAME_country-de",
        "password": "PASSWORD"
    }

]

proxy = random.choice(proxies)

with sync_playwright() as p:

    browser = p.chromium.launch(

        headless=True,

        proxy=proxy

    )

    try:

        page = browser.new_page()

        print("Selected Proxy:")
        print(proxy["username"])

        page.goto(

            "https://httpbin.org/ip",

            wait_until="networkidle"

        )

        print(page.locator("body").text_content())

    finally:

        browser.close()