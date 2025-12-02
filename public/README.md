# Public Folder

This folder contains static assets that are served directly by Next.js.

## Image Organization

Place your images in the following structure:

```
public/
  images/
    logo.png (or .jpg, .svg, etc.)
    hero/
      hero-image.jpg
    team/
      attorney-photo.jpg
    services/
      nursing.jpg
      pharmacy.jpg
```

## How to Use Images

Images in the `public` folder are accessible from the root URL:

- `public/images/logo.png` → `/images/logo.png`
- `public/logo.png` → `/logo.png`

## Best Practices

1. **Optimize images** before adding them (compress, resize)
2. **Use appropriate formats**:
   - PNG for logos/graphics with transparency
   - JPG for photos
   - SVG for scalable graphics
3. **Name files clearly**: `attorney-craig-perry.jpg` not `IMG_1234.jpg`
4. **Keep file sizes reasonable** (under 500KB when possible)

