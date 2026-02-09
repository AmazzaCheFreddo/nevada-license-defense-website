# Contact Form Email Setup Guide

The contact form uses [Resend](https://resend.com) to send emails. You need to configure environment variables to enable email functionality.

## Quick Setup Steps

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (free tier includes 3,000 emails/month)
3. Verify your email address

### 2. Get Your API Key

1. After logging in, go to **API Keys** in the dashboard
2. Click **"Create API Key"**
3. Give it a name (e.g., "Nevada License Defense Website")
4. Copy the API key (it starts with `re_`)

### 3. Set Up Your Domain (Optional but Recommended)

For production, you should verify your domain:
1. Go to **Domains** in Resend dashboard
2. Click **"Add Domain"**
3. Add your domain (e.g., `craigperry.com`)
4. Follow the DNS setup instructions to verify ownership
5. Once verified, you can use emails like `noreply@craigperry.com`

### 4. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
# Resend Email Configuration
RESEND_API_KEY=re_your_api_key_here
CONTACT_EMAIL=info@craigperry.com
FROM_EMAIL=noreply@craigperry.com
```

**Important Notes:**
- Replace `re_your_api_key_here` with your actual Resend API key
- Replace `info@craigperry.com` with the email where you want to receive contact form submissions
- For `FROM_EMAIL`:
  - **Development**: You can use `onboarding@resend.dev` (default, works without domain verification)
  - **Production**: Use a verified domain email like `noreply@craigperry.com`

### 5. Restart Your Development Server

After adding environment variables, restart your Next.js server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Environment Variables Reference

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | Your Resend API key | `re_abc123...` |
| `CONTACT_EMAIL` | Yes | Email address to receive form submissions | `info@craigperry.com` |
| `FROM_EMAIL` | No | Email address to send from (defaults to `onboarding@resend.dev`) | `noreply@craigperry.com` |

## Testing the Contact Form

1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox (and spam folder) for the submission
4. Check the browser console for any errors

## Troubleshooting

### Error: "Email service not configured"
- Make sure `.env.local` exists in the project root
- Verify all required environment variables are set
- Restart your development server after adding variables

### Error: "Invalid API key"
- Double-check your Resend API key is correct
- Make sure there are no extra spaces or quotes around the key
- Verify the API key is active in your Resend dashboard

### Emails not being received
- Check your spam/junk folder
- Verify the `CONTACT_EMAIL` address is correct
- Check Resend dashboard for email logs and delivery status
- Make sure your domain is verified if using a custom `FROM_EMAIL`

### Development vs Production

**Development:**
- Can use `onboarding@resend.dev` as FROM_EMAIL
- No domain verification needed
- Limited to 100 emails/day on free tier

**Production:**
- Should verify your domain
- Use your own domain for FROM_EMAIL
- Better deliverability and branding

## Security Notes

- **Never commit `.env.local` to Git** - it's already in `.gitignore`
- Keep your API keys secure
- Rotate API keys if they're ever exposed
- Use different API keys for development and production

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- Check your Resend dashboard for email logs and analytics
