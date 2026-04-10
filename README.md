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

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## Contact Form (Server Email)

The contact form submits to `POST /api/contact` and sends email through Nodemailer (Gmail SMTP).

Create a `.env.local` file in the project root with:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_google_app_password
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=yourgmail@gmail.com
```

Notes:
- Enable 2-Step Verification on your Google account.
- Generate a Google App Password and use it as `SMTP_PASS`.
- Do not use your normal Gmail account password.
- `CONTACT_TO_EMAIL` is the inbox that receives portfolio messages.

## AI Chatbot (Free-First Setup)

The site now includes a floating portfolio chatbot wired to `POST /api/assistant`.

Create or update `.env.local` with:

```bash
GITHUB_MODELS_API_KEY=your_github_pat
GITHUB_MODELS_MODEL=openai/gpt-4.1-mini
# Optional override (normally do not change)
# GITHUB_MODELS_API_URL=https://models.github.ai/inference/chat/completions
```

Notes:
- Keep `GITHUB_MODELS_API_KEY` server-side only. Do not expose it to the browser.
- Use a GitHub Personal Access Token with access for GitHub Models.
- The API route has a simple in-memory rate limit to protect free-tier usage.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses Next.js App Router with Tailwind CSS for styling.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
