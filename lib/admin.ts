import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin-session')
  return session?.value === 'authenticated'
}

export async function requireAuth() {
  const authenticated = await isAdminAuthenticated()
  if (!authenticated) {
    throw new Error('Unauthorized')
  }
}

/** Use when blog create/update/delete cannot run (e.g. Cloudflare has no writable filesystem). */
export function blogEditingDisabledResponse() {
  return NextResponse.json(
    {
      error:
        'Blog editing is not available on this deployment. Create or edit posts in your repo (content/blog/*.md), then push to deploy.',
      code: 'BLOG_EDITING_DISABLED',
    },
    { status: 503 }
  )
}

/** True if the error is likely due to no writable filesystem (e.g. Cloudflare Workers). */
export function isFsUnavailableError(err: unknown): boolean {
  if (err instanceof Error) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'EROFS' || code === 'EACCES') return true
    const msg = err.message?.toLowerCase() ?? ''
    if (
      /read-only|read only|not implemented|cannot write|filesystem|writefilesync|mkdirsync|unlinksync/.test(msg)
    )
      return true
  }
  return false
}

