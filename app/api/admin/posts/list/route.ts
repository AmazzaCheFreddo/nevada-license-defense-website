import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/admin'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  try {
    await requireAuth()
    const posts = getAllPosts()
    return NextResponse.json({ posts })
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

