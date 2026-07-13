# Playwright Proxy Guide

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
-   Proxy authentication
-   Rotating proxies
-   Sticky sessions
-   Geo-targeting
-   Multiple browser instances
-   Multiple browser contexts
-   Retry logic
-   Docker
-   Best practices

------------------------------------------------------------------------

# Table of Contents

1.  Installation
2.  Repository Structure
3.  Basic Proxy
4.  HTTP vs HTTPS vs SOCKS5
5.  Authentication
6.  Rotating Proxies
7.  Sticky Sessions
8.  Geo Targeting
9.  Multiple Browsers
10. Multiple Contexts
11. Retry Logic
12. Performance
13. Troubleshooting
14. Best Practices
15. FAQ
16. Production Proxies

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
python/
docker/
docs/
images/
```

Each folder focuses on a different part of proxy integration.

------------------------------------------------------------------------

# Basic HTTP Proxy

Node.js

``` javascript
const { chromium } = require("playwright");

const browser = await chromium.launch({
  proxy: {
    server: "http://HOST:PORT",
    username: "USERNAME",
    password: "PASSWORD"
  }
});
```

Python

``` python
browser = p.chromium.launch(
    proxy={
        "server":"http://HOST:PORT",
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

------------------------------------------------------------------------

# Sticky Sessions

Sticky sessions keep the same IP for a configurable period.

Ideal for:

-   Logged-in accounts
-   Shopping carts
-   Multi-step workflows
-   Long browser sessions

------------------------------------------------------------------------

# Geo Targeting

Many websites display different results depending on location.

Typical examples include:

-   Search engines
-   Retail stores
-   Travel websites
-   Streaming services
-   Local business listings

Playwright can launch browsers using country-specific proxy endpoints
where available.

------------------------------------------------------------------------

# Multiple Browser Instances

Large automation systems often launch many browser instances
simultaneously.

A common architecture:

``` text
Worker 1 -> Proxy A
Worker 2 -> Proxy B
Worker 3 -> Proxy C
```

This separation improves scalability and fault isolation.

------------------------------------------------------------------------

# Multiple Browser Contexts

Playwright contexts allow independent sessions inside one browser.

Use them when you need:

-   Separate cookies
-   Separate storage
-   Multiple users
-   Parallel automation

------------------------------------------------------------------------

# Retry Logic

Production automation should always retry transient failures.

Recommendations:

-   Exponential backoff
-   Maximum retry count
-   Timeout handling
-   Structured logging

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

------------------------------------------------------------------------

# Production Proxy Infrastructure

The examples in this repository work with any compatible proxy provider.

If you're looking for production-ready infrastructure, EnigmaProxy
offers:

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
