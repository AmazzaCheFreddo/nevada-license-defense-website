import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { requireAuth } from '@/lib/admin'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export async function PUT(request: NextRequest) {
  try {
    await requireAuth()

    const body = await request.json()
    const { originalSlug, title, date, author, excerpt, image, tags, content, slug } = body

    // Validate required fields
    if (!title || !date || !content || !originalSlug) {
      return NextResponse.json(
        { error: 'Title, date, content, and originalSlug are required' },
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

    // If slug changed, delete old file and create new one
    if (originalSlug !== postSlug) {
      const oldFilePath = path.join(postsDirectory, `${originalSlug}.md`)
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath)
      }
    }

    // Write file
    const filePath = path.join(postsDirectory, `${postSlug}.md`)
    fs.writeFileSync(filePath, fileContent, 'utf8')

    return NextResponse.json({
      success: true,
      slug: postSlug,
      message: 'Blog post updated successfully',
    })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    )
  }
}

