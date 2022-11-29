Portfolio via Headless CMS
========================================

This is my portfolio powered by [Next.js](https://nextjs.org/).

I am developing it is based by the repository [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter).

The content of this portfolio is referenced from [Contentful](https://www.contentful.com/), a headless CMS.


How to Development
----------------------------------------

Install npm modules.


```bash
npm install
```

Edit `.env` file. (required Contentful account)

```bash
cp .env.template .env
# vi .env
```

Run dev server on local.

```bash
npm run dev
open http://localhost:3456/
```

