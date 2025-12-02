# Admin Dashboard Setup

## Overview

The admin dashboard allows you to create and manage blog posts through a web interface. It's protected by password authentication.

## Setup Instructions

### 1. Set Admin Password

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
ADMIN_PASSWORD=your-secure-password-here
```

**Important:** 
- Use a strong password in production
- Never commit `.env.local` to version control (it's already in `.gitignore`)
- If you don't set `ADMIN_PASSWORD`, the default password is `admin123` (change this immediately!)

### 2. Access the Admin Dashboard

1. Navigate to `/admin/login` in your browser
2. Enter your admin password
3. You'll be redirected to the dashboard at `/admin/dashboard`

## Using the Admin Dashboard

### Creating a Blog Post

1. Click the **"+ Create New Blog Post"** button
2. Fill in the form:
   - **Title** (required): The title of your blog post
   - **URL Slug**: Auto-generated from title, but you can customize it
   - **Publication Date** (required): When the post was/will be published
   - **Author**: Defaults to "Craig K. Perry"
   - **Featured Image Path**: Path to image (e.g., `/images/filler images/image.jpg`)
   - **Tags**: Comma-separated list of tags
   - **Excerpt**: Brief summary shown on blog listing page
   - **Content** (required): Your blog post content in Markdown format

3. Click **"Create Blog Post"**

### Markdown Support

You can use standard Markdown in the content field:
- `# Header 1`
- `## Header 2`
- `### Header 3`
- `**bold text**`
- `*italic text*`
- `[link text](url)`
- Bullet lists with `-`
- Numbered lists with `1.`

### Viewing Your Posts

- All existing posts are listed at the bottom of the dashboard
- Click "View →" to see a post on the public blog
- Click "View Blog" to see the public blog page

## Security Notes

- The admin session expires after 24 hours
- Sessions are stored in HTTP-only cookies
- In production, cookies are secure (HTTPS only)
- Always use a strong password in production

## Troubleshooting

**Can't log in?**
- Check that `ADMIN_PASSWORD` is set correctly in `.env.local`
- Make sure you've restarted the dev server after adding the environment variable

**Posts not showing up?**
- Check the browser console for errors
- Verify the `content/blog` directory exists and is writable
- Check server logs for file system errors

**Session expired?**
- Just log in again - sessions last 24 hours

