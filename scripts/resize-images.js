const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const MAX_SIZE_MB = 4;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const IMAGES_DIR = path.join(__dirname, '../public/images/filler images');

async function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

async function resizeImage(filePath) {
  try {
    const currentSize = await getFileSize(filePath);
    
    if (currentSize <= MAX_SIZE_BYTES) {
      console.log(`✓ ${path.basename(filePath)} - Already under ${MAX_SIZE_MB}MB (${(currentSize / 1024 / 1024).toFixed(2)}MB)`);
      return;
    }

    console.log(`\nResizing ${path.basename(filePath)} - Current size: ${(currentSize / 1024 / 1024).toFixed(2)}MB`);

    // Read file into buffer first to avoid file locking issues
    const inputBuffer = fs.readFileSync(filePath);
    const image = sharp(inputBuffer);
    const metadata = await image.metadata();

    // Start with 90% quality and reduce if needed
    let quality = 90;
    let resized = false;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      // Create a new sharp instance from the buffer for each attempt
      const processingImage = sharp(inputBuffer);
      
      // Calculate new dimensions (reduce by 10% each attempt if needed)
      const scale = 1 - (attempts * 0.1);
      const newWidth = Math.round(metadata.width * scale);
      const newHeight = Math.round(metadata.height * scale);

      // Create a buffer with the resized image
      let buffer;
      if (filePath.toLowerCase().endsWith('.png')) {
        buffer = await processingImage
          .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
          .png({ quality, compressionLevel: 9 })
          .toBuffer();
      } else if (filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.jpeg')) {
        buffer = await processingImage
          .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
      } else {
        // For other formats, try to convert to JPEG
        buffer = await processingImage
          .resize(newWidth, newHeight, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality, mozjpeg: true })
          .toBuffer();
      }

      const newSize = buffer.length;

      if (newSize <= MAX_SIZE_BYTES) {
        // Write to temp file first, then replace original
        const tempPath = filePath + '.tmp';
        fs.writeFileSync(tempPath, buffer);
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);
        console.log(`  ✓ Resized to ${(newSize / 1024 / 1024).toFixed(2)}MB (${newWidth}x${newHeight}, quality: ${quality}%)`);
        resized = true;
        break;
      }

      // Reduce quality and/or size for next attempt
      if (quality > 50) {
        quality -= 10;
      } else {
        attempts++;
      }
    }

    if (!resized) {
      console.log(`  ✗ Could not resize ${path.basename(filePath)} below ${MAX_SIZE_MB}MB`);
    }
  } catch (error) {
    console.error(`  ✗ Error processing ${path.basename(filePath)}:`, error.message);
  }
}

async function processImages() {
  try {
    const files = fs.readdirSync(IMAGES_DIR);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
    });

    console.log(`Found ${imageFiles.length} images to process...\n`);

    for (const file of imageFiles) {
      const filePath = path.join(IMAGES_DIR, file);
      await resizeImage(filePath);
    }

    console.log('\n✓ Image resizing complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

processImages();

