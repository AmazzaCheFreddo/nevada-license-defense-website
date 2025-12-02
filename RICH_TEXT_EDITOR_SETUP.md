# Rich Text Editor Setup

## Installation Required

Before using the rich text editor, you need to install the `react-quill` package:

```bash
npm install react-quill
```

## Features

The rich text editor provides a Word/Google Docs-like experience with the following formatting options:

### Text Formatting
- **Bold** - Make text bold
- **Italic** - Make text italic
- **Underline** - Underline text
- **Strikethrough** - Strike through text

### Headers
- H1 through H6 - Different header sizes

### Font Options
- **Font Family** - Choose from different fonts
- **Font Size** - Small, Normal, Large, Huge

### Colors
- **Text Color** - Change text color
- **Background Color** - Change background color

### Lists
- **Ordered List** - Numbered lists
- **Bullet List** - Bulleted lists
- **Indent** - Increase/decrease indentation

### Alignment
- Left, Center, Right, Justify

### Other Features
- **Blockquote** - Quote blocks
- **Code Block** - Code formatting
- **Links** - Add hyperlinks
- **Images** - Insert images (use the image upload feature in the form)
- **Clean** - Remove all formatting

## Usage

1. Go to the admin dashboard (`/admin/dashboard`)
2. Click "+ Create New Blog Post" or "Edit" on an existing post
3. Use the formatting toolbar above the content area
4. Format your text just like in Word or Google Docs
5. Click "Create Blog Post" or "Update Blog Post" when done

## Backward Compatibility

The system automatically detects whether content is HTML (from the rich text editor) or Markdown (from older posts). Both formats are supported and will display correctly.

## Notes

- Images inserted through the editor should use the image upload feature in the form
- The editor outputs HTML, which is stored directly in the blog post files
- All formatting is preserved when editing posts

