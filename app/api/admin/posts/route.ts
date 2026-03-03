import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth, blogEditingDisabledResponse, isFsUnavailableError } from '@/lib/admin'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export async function POST(request: NextRequest) {
  try {
    await requireAuth()

    if (process.env.DISABLE_FS_BLOG_EDITING === '1' || process.env.DISABLE_FS_BLOG_EDITING === 'true') {
      return blogEditingDisabledResponse()
    }

    const body = await request.json()
    const { title, date, author, excerpt, image, tags, content, slug } = body

    // Validate required fields
    if (!title || !date || !content) {
      return NextResponse.json(
        { error: 'Title, date, and content are required' },
        { status: 400 }
      )
    }

    // Generate slug from title if not provided
    const postSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create frontmatter
    const frontmatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: "${date}"`,
      author ? `author: "${author.replace(/"/g, '\\"')}"` : 'author: "Craig K. Perry"',
      excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : '',
      image ? `image: "${image}"` : '',
      tags && tags.length > 0 ? `tags: [${tags.map((tag: string) => `"${tag.replace(/"/g, '\\"')}"`).join(', ')}]` : '',
      '---',
      '',
    ].filter(Boolean).join('\n')

    // Combine frontmatter and content
    const fileContent = `${frontmatter}${content}`

    // Ensure posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
    }

    // Write file
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({
      success: true,
      slug: postSlug,
      message: 'Blog post created successfully',
    })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    if (isFsUnavailableError(error)) {
      return blogEditingDisabledResponse()
    }
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    )
  }
}

