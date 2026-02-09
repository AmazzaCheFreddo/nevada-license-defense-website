# YouTube Videos Setup Guide

## No API Key Required!

You have **3 options** to add YouTube videos to your website, and **none of them require a YouTube API key**:

---

## Option 1: Manual Video List (Recommended - Simplest)

**Pros:**
- ✅ No API key needed
- ✅ Works immediately
- ✅ Full control over which videos appear
- ✅ No rate limits
- ✅ No setup required

**How to Use:**

1. Go to your YouTube channel: https://www.youtube.com/@lvnurseattorney
2. Copy the video IDs from the URLs (the part after `?v=` in the URL)
3. Edit `content/youtube-videos.json` and add your videos:

```json
[
  {
    "id": "dQw4w9WgXcQ",
    "title": "Your Video Title",
    "description": "Video description (optional)",
    "publishedAt": "2024-01-15T00:00:00Z"
  },
  {
    "id": "ANOTHER_VIDEO_ID",
    "title": "Another Video Title",
    "description": "Another description",
    "publishedAt": "2024-01-14T00:00:00Z"
  }
]
```

4. Save the file - videos will appear automatically!

**To get video IDs:**
- From video URL: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`
- The `VIDEO_ID_HERE` part is what you need

**Example:**
If your video URL is: `https://www.youtube.com/watch?v=abc123xyz`
Then your video ID is: `abc123xyz`

---

## Option 2: YouTube RSS Feed (Auto-Updates)

**Pros:**
- ✅ No API key needed
- ✅ Auto-updates when you publish new videos
- ✅ Fetches latest videos automatically

**Cons:**
- ⚠️ Requires channel ID (can be extracted automatically)
- ⚠️ May have rate limits from YouTube

**How it Works:**
The system will automatically fetch your channel's RSS feed and display the latest videos.

**Setup:**
1. The RSS feed endpoint is already set up at `/api/youtube-videos/rss`
2. It will try to automatically extract your channel ID
3. If it fails, you can manually provide your channel ID

**To get your Channel ID:**
1. Go to https://www.youtube.com/@lvnurseattorney
2. View page source (Ctrl+U)
3. Search for `"channelId":"UC...`
4. Copy the channel ID (starts with `UC`)

---

## Option 3: YouTube API (Current Implementation)

**Pros:**
- ✅ Most reliable
- ✅ Rich metadata
- ✅ Official method

**Cons:**
- ❌ Requires API key
- ❌ Setup required
- ❌ Rate limits

**Setup:**
1. Get YouTube API key from Google Cloud Console
2. Add to `.env.local`: `YOUTUBE_API_KEY=your-key-here`
3. Videos will fetch automatically

---

## Recommended Approach

**Start with Option 1 (Manual List):**
- Easiest to set up
- No dependencies
- Works immediately
- You control exactly which videos appear

**Then optionally add Option 2 (RSS):**
- For auto-updating when you publish new videos
- Can combine with manual list

---

## Current Implementation

The videos page tries in this order:
1. Manual list (`/api/youtube-videos/manual`)
2. API (`/api/youtube-videos`) - if API key is set
3. Fallback message with channel link

**So you can use the manual list right now without any API key!**

---

## Quick Start

1. Open `content/youtube-videos.json`
2. Replace the example videos with your actual video IDs
3. Save the file
4. Visit `/board-of-nursing/videos` - your videos will appear!

That's it! No API key needed. 🎉

