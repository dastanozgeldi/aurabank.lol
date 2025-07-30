## TODO

### Third Sprint
- [x] polar webhook: insert to subscriptions table on subscription active event
- [ ] put /snitch in a paywall
- [x] "formula for aura points"
- [x] update [logo](public/logo.png) and favicon
- [x] update [og image](public/og-image.png)

### Second Sprint

- [x] implement aura snitch feature
  - [x] create snitches table (id, culprit_id, victim_id, event, aura)
  - [x] form with user handle and story of what happened
    - [x] take current user id as culprit_id
    - [x] create action to submit snitch
  - [x] display snitch events on user profile
- [x] work on design

### First Sprint

- [x] setup home page
- [x] wallet page design
- [x] setup clerk
- [x] wallet page: redirect unauthorized users to sign in page
- [x] setup drizzle and postgres
- [x] create events table
- [x] vercel ai sdk
- [x] structured outputs https://sdk.vercel.ai/docs/guides/llama-3_1#generating-structured-data
- [x] generate event title, aura gain/loss and objective explanation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
