# Google Reviews Archive System

## Overview

This system automatically archives Google reviews to build a complete collection over time, bypassing the Google Places API limitation of 5 reviews per request.

## How It Works

1. **First Request**: Fetches reviews from Google Places API and saves them to `content/reviews.json`
2. **Subsequent Requests**: 
   - Fetches new reviews from Google Places API
   - Merges them with archived reviews (avoiding duplicates)
   - Saves updated archive
   - Returns all archived reviews

## Fetching More Reviews

Since Google Places API only returns 5 reviews per request, you can use the refresh endpoint to make multiple API calls and accumulate more reviews:

### Method 1: Use the Refresh API Endpoint

Call the refresh endpoint directly in your browser or with a tool:

```
http://localhost:3333/api/google-reviews/refresh?count=5
```

- `count`: Number of API calls to make (1-10, default: 1)
- Each call may return different reviews (Google rotates them)
- All unique reviews are merged into the archive

**Example**: To make 10 API calls:
```
http://localhost:3333/api/google-reviews/refresh?count=10
```

### Method 2: Use the NPM Script

Run the refresh script from the command line:

```bash
npm run refresh-reviews
```

Or specify a custom count:
```bash
npm run refresh-reviews -- --count=10
```

### Method 3: Call Multiple Times

Simply visit the refresh endpoint multiple times:
1. Visit: `http://localhost:3333/api/google-reviews/refresh?count=5`
2. Wait a moment
3. Visit again: `http://localhost:3333/api/google-reviews/refresh?count=5`
4. Repeat until you have all reviews

### Strategy for Getting All Reviews

Since Google rotates which 5 reviews it returns:
1. Make multiple refresh calls (5-10 calls recommended)
2. Each call may return different reviews
3. The archive automatically merges and deduplicates
4. Over time, you'll accumulate all your reviews

**Recommended**: Make 5-10 refresh calls initially to build up your archive quickly.

## File Location

- Archive file: `content/reviews.json`
- Library functions: `lib/reviews.ts`
- API endpoint: `app/api/google-reviews/route.ts`

## Features

- **Automatic Archiving**: New reviews are automatically added to the archive
- **Duplicate Prevention**: Uses review time + author name as unique identifier
- **Fallback**: If Google API fails, returns archived reviews
- **Sorted**: Reviews are sorted by date (newest first)
- **Persistent**: Reviews persist across server restarts

## Review Identification

Reviews are uniquely identified by: `{time}-{author_name}`

This ensures that:
- Same review from different API calls won't be duplicated
- Updated reviews will replace old versions
- All reviews are preserved

## Manual Management

If needed, you can manually edit `content/reviews.json` to:
- Remove reviews
- Add reviews manually
- Update review data

The file structure:
```json
{
  "lastUpdated": "2024-01-15T10:30:00.000Z",
  "businessName": "Nevada License Defense",
  "rating": 4.8,
  "totalRatings": 15,
  "reviews": [...]
}
```

## Notes

- The archive grows over time as new reviews are fetched
- Google Places API typically returns up to 5 reviews per request
- Over time, you'll accumulate all reviews through multiple API calls
- Reviews are sorted by date (newest first)

