# Playwright Proxy Examples

> Production-ready Playwright proxy examples for Node.js & Python. Learn
> HTTP, HTTPS, SOCKS5, rotating proxies, sticky sessions, proxy
> authentication, geo-targeting, and browser automation.

![License](https://img.shields.io/badge/license-MIT-green)
![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-success)
![Python](https://img.shields.io/badge/Python-3.10+-yellow)

------------------------------------------------------------------------

## Why this repository?

Playwright has become one of the most popular browser automation
frameworks. Whether you're building browser tests, AI agents, monitoring
systems, or automation workflows, you'll eventually need to route
traffic through proxies.

This repository demonstrates production-ready proxy configurations and
explains when to use each approach.

Examples cover:

-   HTTP proxies
-   HTTPS proxies
-   SOCKS5 proxies
-   Best practices

------------------------------------------------------------------------

# Table of Contents

1.  Installation
2.  Repository Structure
3.  Running the Examples
4.  Basic Proxy
5.  HTTP vs HTTPS vs SOCKS5
6.  Authentication
7.  Rotating Proxies
8.  Proxy Pool
9.  Sticky Sessions
10. Geo Targeting
11. Sticky Geo Targeting
12. Multiple Browser Instances
13. Retry Logic
14. Screenshots
15. Performance
16. Troubleshooting
17. Best Practices
18. FAQ
19. Production Proxies

------------------------------------------------------------------------

# Installation

## Node.js

``` bash
npm install playwright
```

## Python

``` bash
pip install playwright
playwright install
```

------------------------------------------------------------------------

# Repository Structure

``` text
nodejs/
  basic-http.js            Plain HTTP proxy
  https-proxy.js           HTTPS proxy
  socks5-proxy.js          SOCKS5 proxy
  rotating.js              Random proxy selected from a pool per run
  proxy-pool.js            Named proxy pool launched in parallel
  sticky-session.js        Sticky session via a generated session ID
  geo-targeting.js         Country / state / city targeting
  sticky-geo-targeting.js  Geo targeting combined with a sticky session
  multiple-browsers.js     Multiple browsers, each with its own proxy
  retry.js                 Retry logic with a max attempt count
  screenshot.js            Proxied page screenshot

python/
  basic_http.py
  https_proxy.py
  socks5_proxy.py
  rotating.py
  proxy_pool.py
  sticky_session.py
  geo_targeting.py
  sticky_geo_targeting.py
  multiple_browsers.py
  retry.py
  screenshot.py
```

Each Node.js example has a matching Python example that implements the
same behavior.

------------------------------------------------------------------------

# Running the Examples

## Node.js

Each example is registered as an npm script:

``` bash
npm run basic-http
npm run https-proxy
npm run socks5-proxy
npm run rotating
npm run proxy-pool
npm run sticky-session
npm run geo-targeting
npm run sticky-geo-targeting
npm run multiple-browsers
npm run retry
npm run screenshot
```

Or run a file directly:

``` bash
node nodejs/basic-http.js
```

## Python

``` bash
python python/basic_http.py
python python/https_proxy.py
python python/socks5_proxy.py
python python/rotating.py
python python/proxy_pool.py
python python/sticky_session.py
python python/geo_targeting.py
python python/sticky_geo_targeting.py
python python/multiple_browsers.py
python python/retry.py
python python/screenshot.py
```

Before running any example, replace `USERNAME` and `PASSWORD` with your
EnigmaProxy credentials.

------------------------------------------------------------------------

# Basic HTTP Proxy

Node.js

``` javascript
const { chromium } = require("playwright");

const browser = await chromium.launch({
  proxy: {
    server: "http://resi.enigmaproxy.net:12321",
    username: "USERNAME",
    password: "PASSWORD"
  }
});
```

Python

``` python
browser = p.chromium.launch(
    proxy={
        "server":"http://resi.enigmaproxy.net:12321",
        "username":"USERNAME",
        "password":"PASSWORD"
    }
)
```

# HTTPS Proxy

Node.js

``` javascript
const { chromium } = require("playwright");

const browser = await chromium.launch({
  proxy: {
    server: "https://resi.enigmaproxy.net:12321",
    username: "USERNAME",
    password: "PASSWORD"
  }
});
```

Python

``` python
browser = p.chromium.launch(
    proxy={
        "server":"https://resi.enigmaproxy.net:12321",
        "username":"USERNAME",
        "password":"PASSWORD"
    }
)
```

# SOCKS5 Proxy

Node.js

``` javascript
const { chromium } = require("playwright");

const browser = await chromium.launch({
  proxy: {
    server: "socks5://resi.enigmaproxy.net:32325",
    username: "USERNAME",
    password: "PASSWORD"
  }
});
```

Python

``` python
browser = p.chromium.launch(
    proxy={
        "server":"socks5://resi.enigmaproxy.net:32325",
        "username":"USERNAME",
        "password":"PASSWORD"
    }
)
```

------------------------------------------------------------------------

# HTTP vs HTTPS vs SOCKS5

## HTTP

Simple and widely supported.

Best for:

-   Testing
-   APIs
-   General automation

## HTTPS

Encrypted communication between client and proxy.

Best for:

-   Production
-   Secure environments

## SOCKS5

Protocol agnostic and highly flexible.

Best for:

-   Browser automation
-   Mixed traffic
-   Advanced networking

------------------------------------------------------------------------

# Proxy Authentication

Most providers use:

-   Username
-   Password

Never hardcode credentials.

Instead:

``` bash
export PROXY_USER=...
export PROXY_PASS=...
```

EnigmaProxy also encodes routing options directly into the username
using suffixes, so rotation, sticky sessions, and geo-targeting all
reuse the same `username` / `password` fields:

``` text
USERNAME                                              Random exit IP
USERNAME_country-us                                   Country targeting
USERNAME_country-us_state-california                  State targeting
USERNAME_country-us_state-california_city-losangeles  City targeting
USERNAME_session-<id>                                 Sticky session
USERNAME_country-us_session-<id>                      Sticky + geo
```

------------------------------------------------------------------------

# Rotating Proxies

Rotating proxies change the exit IP over time or per request.

Ideal for:

-   Public web data collection
-   AI agents
-   Search monitoring
-   Distributed workloads

Benefits:

-   Better scalability
-   Reduced dependency on a single endpoint
-   Flexible request routing

Node.js (`nodejs/rotating.js`)

``` javascript
const proxies = [
  { server: "http://resi.enigmaproxy.net:12321", username: "USERNAME", password: "PASSWORD" },
  { server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-us", password: "PASSWORD" },
  { server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-gb", password: "PASSWORD" },
  { server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-de", password: "PASSWORD" }
];

const proxy = proxies[Math.floor(Math.random() * proxies.length)];

const browser = await chromium.launch({ headless: true, proxy });
```

Python (`python/rotating.py`)

``` python
import random

proxies = [
    {"server": "http://resi.enigmaproxy.net:12321", "username": "USERNAME", "password": "PASSWORD"},
    {"server": "http://resi.enigmaproxy.net:12321", "username": "USERNAME_country-us", "password": "PASSWORD"},
    {"server": "http://resi.enigmaproxy.net:12321", "username": "USERNAME_country-gb", "password": "PASSWORD"},
    {"server": "http://resi.enigmaproxy.net:12321", "username": "USERNAME_country-de", "password": "PASSWORD"}
]

proxy = random.choice(proxies)

browser = p.chromium.launch(headless=True, proxy=proxy)
```

------------------------------------------------------------------------

# Proxy Pool

A proxy pool assigns a distinct, named proxy to each worker instead of
picking one at random. Useful when you want every worker to have a
predictable, isolated exit IP.

Node.js (`nodejs/proxy-pool.js`)

``` javascript
const proxies = [
  { name: "Random", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME", password: "PASSWORD" },
  { name: "United States", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-us", password: "PASSWORD" },
  { name: "Germany", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-de", password: "PASSWORD" }
];

async function launch(proxy) {
  const browser = await chromium.launch({ headless: true, proxy });
  // ... use the browser
  await browser.close();
}

await Promise.all(proxies.map(launch));
```

Python (`python/proxy_pool.py`) uses `ThreadPoolExecutor` to launch one
browser per proxy concurrently, since Playwright's sync API is
blocking.

------------------------------------------------------------------------

# Sticky Sessions

Sticky sessions keep the same IP for a configurable period.

Ideal for:

-   Logged-in accounts
-   Shopping carts
-   Multi-step workflows
-   Long browser sessions

A random session ID is generated per run and appended to the username
as `_session-<id>`. Reusing the same ID on a later launch keeps the
same exit IP.

Node.js (`nodejs/sticky-session.js`)

``` javascript
const crypto = require("crypto");
const session = crypto.randomBytes(4).toString("hex");

const browser = await chromium.launch({
  headless: true,
  proxy: {
    server: "http://resi.enigmaproxy.net:12321",
    username: `USERNAME_session-${session}`,
    password: "PASSWORD"
  }
});
```

Python (`python/sticky_session.py`)

``` python
import secrets
session = secrets.token_hex(4)

browser = p.chromium.launch(
    headless=True,
    proxy={
        "server": "http://resi.enigmaproxy.net:12321",
        "username": f"USERNAME_session-{session}",
        "password": "PASSWORD"
    }
)
```

------------------------------------------------------------------------

# Geo Targeting

Many websites display different results depending on location.

Typical examples include:

-   Search engines
-   Retail stores
-   Travel websites
-   Streaming services
-   Local business listings

Playwright launches the browser normally; the location is selected by
appending `country` / `state` / `city` suffixes to the proxy username.

Node.js (`nodejs/geo-targeting.js`)

``` javascript
const examples = {
  random: "USERNAME",
  country: "USERNAME_country-us",
  state: "USERNAME_country-us_state-california",
  city: "USERNAME_country-us_state-california_city-losangeles",
  international: "USERNAME_country-sa_state-alhududashshamaliyah_city-arar"
};

const browser = await chromium.launch({
  headless: true,
  proxy: {
    server: "http://resi.enigmaproxy.net:12321",
    username: examples.country,
    password: "PASSWORD"
  }
});
```

Python (`python/geo_targeting.py`) mirrors the same `examples` dict and
username suffixes.

------------------------------------------------------------------------

# Sticky Geo Targeting

Combines a fixed location with a sticky session by chaining both
suffixes onto the username: `USERNAME_country-us_session-<id>`. Useful
for multi-step flows (login, checkout, pagination) that must stay in
the same country and keep the same exit IP throughout.

Node.js (`nodejs/sticky-geo-targeting.js`)

``` javascript
const session = crypto.randomBytes(4).toString("hex");

const username = `USERNAME_country-us_session-${session}`;

const browser = await chromium.launch({
  headless: true,
  proxy: {
    server: "http://resi.enigmaproxy.net:12321",
    username,
    password: "PASSWORD"
  }
});
```

Python (`python/sticky_geo_targeting.py`) generates the session ID with
`secrets.token_hex(4)` and builds the same suffixed username.

------------------------------------------------------------------------

# Multiple Browser Instances

Large automation systems often launch many browser instances
simultaneously, each with its own proxy.

A common architecture:

``` text
Worker 1 -> Proxy A
Worker 2 -> Proxy B
Worker 3 -> Proxy C
```

This separation improves scalability and fault isolation.

Node.js (`nodejs/multiple-browsers.js`) launches one browser per named
proxy in parallel with `Promise.all`:

``` javascript
const proxies = [
  { name: "Random", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME", password: "PASSWORD" },
  { name: "United States", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-us", password: "PASSWORD" },
  { name: "Germany", server: "http://resi.enigmaproxy.net:12321", username: "USERNAME_country-de", password: "PASSWORD" }
];

await Promise.all(proxies.map(launch));
```

Python (`python/multiple_browsers.py`) achieves the same result with
`concurrent.futures.ThreadPoolExecutor`, since Playwright's sync API
blocks per call.

------------------------------------------------------------------------

# Retry Logic

Production automation should always retry transient failures.

Recommendations:

-   Maximum retry count
-   Timeout handling
-   Structured logging
-   Exponential backoff (for higher-volume workloads)

Node.js (`nodejs/retry.js`)

``` javascript
const MAX_RETRIES = 3;

async function browse(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const browser = await chromium.launch({ headless: true, proxy });
    try {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
      await browser.close();
      return;
    } catch (err) {
      await browser.close();
      if (attempt === MAX_RETRIES) throw err;
    }
  }
}
```

Python (`python/retry.py`) implements the same fixed-attempt retry loop
using a `for attempt in range(1, MAX_RETRIES + 1)` loop.

------------------------------------------------------------------------

# Screenshots

Capturing a full-page screenshot through a proxy, useful for visual
QA, geo-specific rendering checks, or monitoring.

Node.js (`nodejs/screenshot.js`)

``` javascript
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto("https://example.com", { waitUntil: "networkidle" });

await page.screenshot({ path: "example.png", fullPage: true });
```

Python (`python/screenshot.py`) uses `page.screenshot(path=..., full_page=True)`.

------------------------------------------------------------------------

# Performance Tips

-   Reuse browser instances
-   Reuse contexts
-   Close unused pages
-   Limit concurrency
-   Monitor latency
-   Track success rate

------------------------------------------------------------------------

# Troubleshooting

## 407 Proxy Authentication Required

Verify username and password.

## Timeout

Check connectivity and increase timeout values.

## SSL Errors

Ensure certificates are valid.

## 403 Forbidden

Review headers, session handling, and automation flow.

------------------------------------------------------------------------

# Best Practices

-   Store secrets securely
-   Monitor proxy health
-   Choose the right proxy type
-   Respect website terms and applicable laws
-   Log failures
-   Test locally before deployment

------------------------------------------------------------------------

# FAQ

### Which proxy type should I choose?

Residential for browser automation and public web data.

Datacenter for speed.

ISP for persistent connections.

### Does Playwright support SOCKS5?

Yes.

### Can I use rotating proxies?

Yes.

### Can I use sticky sessions?

Yes.

### How granular can geo-targeting be?

Country, state, and city, via `country-`, `state-`, and `city-`
username suffixes. See [geo-targeting.js](nodejs/geo-targeting.js) and
[geo_targeting.py](python/geo_targeting.py) for the full suffix list.

### Can I combine sticky sessions with geo-targeting?

Yes, see [sticky-geo-targeting.js](nodejs/sticky-geo-targeting.js) and
[sticky_geo_targeting.py](python/sticky_geo_targeting.py).

------------------------------------------------------------------------

# Production Proxy Infrastructure

The examples in this repository work with any compatible proxy provider.

If you're looking for production-ready infrastructure, EnigmaProxy
offers:

-   Budget Residential Proxies
-   Residential Proxies
-   Enterprise Residential Proxies
-   Unlimited ISP
-   Static ISP
-   IPv6
-   Datacenter
-   Coverage in 200+ countries
-   HTTP & SOCKS5
-   Rotating & Sticky Sessions
-   Dashboard & API

Products:

-   https://enigmaproxy.net/?plan=budget_residential
-   https://enigmaproxy.net/pricing?plan=residential
-   https://enigmaproxy.net/pricing?plan=enterprise_residential
-   https://enigmaproxy.net/pricing?plan=unlimited_isp
-   https://enigmaproxy.net/pricing?plan=isp
-   https://enigmaproxy.net/pricing?plan=ipv6
-   https://enigmaproxy.net/pricing?plan=datacenter

Website:

https://enigmaproxy.net

------------------------------------------------------------------------

# License

MIT License.

Feel free to fork, improve, and contribute.
