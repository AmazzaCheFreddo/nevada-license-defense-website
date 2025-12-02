import Image from 'next/image'
import { ComponentProps } from 'react'

interface CustomImageProps extends Omit<ComponentProps<typeof Image>, 'src'> {
  src: string
  alt: string
  priority?: boolean
}

/**
 * Optimized image component using Next.js Image
 * 
 * Usage:
 * <OptimizedImage 
 *   src="/images/logo.png" 
 *   alt="Nevada License Defense Logo"
 *   width={200}
 *   height={100}
 * />
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className = '',
  ...props
}: CustomImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={className}
      {...props}
    />
  )
}

