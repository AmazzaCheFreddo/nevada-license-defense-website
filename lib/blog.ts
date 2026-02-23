import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  dateModified?: string
  author: string
  excerpt: string
  content: string
  image?: string
  tags?: string[]
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md') && name !== 'README.md')
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        dateModified: data.dateModified || undefined,
        author: data.author || 'Craig K. Perry',
        excerpt: data.excerpt || '',
        content,
        image: data.image || undefined,
        tags: data.tags || [],
      } as BlogPost
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      dateModified: data.dateModified || undefined,
      author: data.author || 'Craig K. Perry',
      excerpt: data.excerpt || '',
      content,
      image: data.image || undefined,
      tags: data.tags || [],
    } as BlogPost
  } catch (error) {
    return null
  }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((name) => name.endsWith('.md') && name !== 'README.md')
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

/** All unique tags across all posts, sorted. Deduped case-insensitively (first occurrence wins). */
export function getAllTags(posts: BlogPost[]): string[] {
  const byLower = new Map<string, string>()
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      const key = tag.toLowerCase()
      if (!byLower.has(key)) byLower.set(key, tag)
    }
  }
  return Array.from(byLower.values()).sort()
}

/** Deletes a post by slug. Returns true if deleted, false if not found. Disallows path traversal. */
export function deletePost(slug: string): boolean {
  if (!slug || slug.includes('..') || slug.includes(path.sep) || /[\/\\]/.test(slug)) {
    return false
  }
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  if (!path.resolve(fullPath).startsWith(path.resolve(postsDirectory))) {
    return false
  }
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath)
      return true
    }
    return false
  } catch {
    return false
  }
}

