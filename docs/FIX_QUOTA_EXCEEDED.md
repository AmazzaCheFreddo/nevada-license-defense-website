# Fix "Quota Exceeded" Error

## Error: Quota Exceeded for Google Business Profile API

This error occurs when you've exceeded the rate limit for API requests. Google Business Profile API has strict quotas, especially for new projects.

## Quick Solutions

### Option 1: Wait and Retry (Easiest)

The quota resets after a short period (usually 1 minute):

1. **Wait 1-2 minutes** for the quota to reset
2. Try the OAuth flow again
3. The quota should be reset by then

### Option 2: Request Quota Increase (Recommended for Production)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Dashboard**
4. Find **"Google Business Profile API"** (or "My Business API")
5. Click on it
6. Go to **"Quotas"** tab
7. Find **"Requests per minute"** quota
8. Click **"EDIT QUOTAS"** or the pencil icon
9. Request an increase (e.g., from 60 to 300 requests per minute)
10. Fill out the form explaining your use case:
    - **Use case:** "Displaying customer reviews on our website"
    - **Expected volume:** "Low - fetching reviews once per day"
    - **Justification:** "Need to fetch all business reviews for display on website"
11. Submit the request
12. Wait for approval (usually 24-48 hours)

### Option 3: Use Cached/Archived Reviews (Workaround)

If you've already successfully fetched reviews once, you can use the archived reviews:

1. The reviews are stored in `content/reviews.json`
2. Your website will automatically use archived reviews if the API fails
3. You can manually refresh reviews later when quota resets

## Understanding Quotas

### Default Quotas (New Projects)

- **Requests per minute:** Usually 60-100 requests
- **Requests per day:** Varies by project
- **Quota resets:** Every minute (for per-minute limits)

### Why This Happens

- New projects have lower default quotas
- Multiple OAuth attempts can quickly exhaust the quota
- The API makes several calls during the OAuth flow:
  1. Get accounts
  2. Get locations
  3. Get reviews (potentially multiple pages)

## Prevention

1. **Don't retry immediately** - Wait at least 1 minute between attempts
2. **Request quota increase** - For production use, request higher quotas
3. **Use archived reviews** - Once fetched, reviews are cached locally
4. **Batch requests** - The code already batches review fetching efficiently

## Current Status

Your OAuth flow is working! The quota error means:
- ✅ OAuth authentication succeeded
- ✅ API access is working
- ❌ Just hit the rate limit

**Solution:** Wait 1-2 minutes and try again, or request a quota increase for production use.

