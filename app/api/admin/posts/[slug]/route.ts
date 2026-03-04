import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, blogEditingDisabledResponse, isFsUnavailableError } from '@/lib/admin'
import { getPostBySlug, deletePost } from '@/lib/blog'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth()
    const { slug } = await params
    const post = getPostBySlug(slug)

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth()

    if (process.env.DISABLE_FS_BLOG_EDITING === '1' || process.env.DISABLE_FS_BLOG_EDITING === 'true') {
      return blogEditingDisabledResponse()
    }

    const { slug } = await params
    const deleted = deletePost(slug)
    if (!deleted) {
      return NextResponse.json(
        { error: 'Post not found or invalid slug' },
        { status: 404 }
      )
    }
    return NextResponse.json({ success: true })
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
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}

