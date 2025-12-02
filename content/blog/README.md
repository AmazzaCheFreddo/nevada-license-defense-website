# Blog Posts

This directory contains all blog posts for the Nevada License Defense website.

## Creating a New Blog Post

1. Create a new `.md` file in this directory (e.g., `my-new-post.md`)
2. Use the following template:

```markdown
---
title: "Your Post Title Here"
date: "2024-01-15"
author: "Craig K. Perry"
excerpt: "A brief summary of your post that will appear on the blog listing page."
image: "/images/filler images/your-image.jpg"
tags: ["Tag1", "Tag2", "Tag3"]
---

# Your Post Title

Your content here in Markdown format.

## Subheading

More content...

### Sub-subheading

Even more content...

**Bold text** and *italic text* work too.

[Link text](https://example.com)
```

## Frontmatter Fields

- **title** (required): The title of your blog post
- **date** (required): Publication date in YYYY-MM-DD format
- **author** (optional): Author name (defaults to "Craig K. Perry")
- **excerpt** (optional): Short summary for the blog listing page
- **image** (optional): Path to featured image (e.g., `/images/filler images/image.jpg`)
- **tags** (optional): Array of tags for categorization

## Markdown Support

The blog supports standard Markdown:
- Headers (# ## ###)
- **Bold** and *italic* text
- [Links](url)
- Lists
- Paragraphs

## SEO Benefits

All posts are automatically:
- ✅ Pre-rendered as static HTML (fast loading)
- ✅ Include proper meta tags and Open Graph data
- ✅ Have structured data (Schema.org) for search engines
- ✅ Included in the sitemap
- ✅ Optimized images with Next.js Image component

