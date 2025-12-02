# How to Add Photos to Your Website

## Step 1: Add Your Image Files

1. Place your image files in the `public/images/` folder
2. For example:
   - `public/images/logo.png` - Your logo
   - `public/images/attorney-photo.jpg` - Attorney photo
   - `public/images/hero-background.jpg` - Hero section image

## Step 2: Use Next.js Image Component

### Example 1: Add Logo to Header

```tsx
import Image from 'next/image'

// In your Header component:
<Link href="/" className="flex items-center hover-lift">
  <Image
    src="/images/logo.png"
    alt="Nevada License Defense Logo"
    width={200}
    height={60}
    priority
    className="h-12 w-auto"
  />
</Link>
```

### Example 2: Add Image to Hero Section

```tsx
import Image from 'next/image'

// In your Hero component:
<section className="relative">
  <Image
    src="/images/hero-background.jpg"
    alt="Legal defense background"
    fill
    className="object-cover opacity-20"
    priority
  />
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</section>
```

### Example 3: Add Service Images

```tsx
import Image from 'next/image'

<div className="bg-white rounded-lg shadow-lg p-8">
  <Image
    src="/images/services/nursing.jpg"
    alt="Nursing license defense"
    width={400}
    height={250}
    className="rounded-lg mb-4"
  />
  <h3>Nevada State Board of Nursing</h3>
</div>
```

### Example 4: Add Attorney Photo

```tsx
import Image from 'next/image'

<div className="flex items-center gap-6">
  <Image
    src="/images/attorney-craig-perry.jpg"
    alt="Attorney Craig K. Perry"
    width={200}
    height={200}
    className="rounded-full object-cover"
  />
  <div>
    <h2>Craig K. Perry</h2>
    <p>Licensed Nevada Attorney</p>
  </div>
</div>
```

## Important Notes

1. **Always include `alt` text** for accessibility
2. **Set width and height** (or use `fill` for background images)
3. **Use `priority`** for images above the fold (like logos)
4. **Optimize images** before uploading (compress, resize)
5. **Image paths** start with `/` (not `/public/`)

## Image Optimization Tips

- **Compress images**: Use tools like TinyPNG or ImageOptim
- **Resize appropriately**: Don't use 4000px images for 400px displays
- **Choose right format**: 
  - JPG for photos
  - PNG for logos/graphics
  - SVG for scalable graphics

## Quick Reference

- Image location: `public/images/your-image.jpg`
- Use in code: `src="/images/your-image.jpg"`
- Always import: `import Image from 'next/image'`
- Required props: `src`, `alt`, `width`, `height` (or `fill`)

