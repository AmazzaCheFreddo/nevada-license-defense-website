# Reviews Auto-Refresh System

## How It Works

The review system now automatically checks for new reviews and updates them without manual intervention.

### Automatic Refresh Schedule

- **Cache Duration**: Reviews are cached for **1 minute** (60 seconds)
- **Archive Refresh**: Archived reviews are automatically refreshed if they're older than **30 minutes**
- **Automatic Merging**: New reviews are automatically merged with existing archived reviews

### Update Frequency

1. **Every 1 minute**: The API checks if cached data needs refreshing
2. **Every 30 minutes**: If archived reviews exist, they're automatically refreshed with new reviews from Google Places API
3. **Automatic**: New reviews are detected and added to the archive automatically

## How New Reviews Are Added

When someone visits your website:
1. The system checks if archived reviews are older than 30 minutes
2. If stale, it fetches fresh reviews from Google Places API
3. New reviews are automatically merged with existing ones (duplicates are prevented)
4. The archive is updated with the latest reviews
5. Only 5-star reviews are displayed on the website

## Manual Refresh (If Needed)

If you want to manually trigger a refresh immediately:

### Option 1: Via Browser
Visit this URL in your browser:
```
http://localhost:3333/api/google-reviews/refresh?count=5
```

The `count` parameter (1-10) determines how many API calls to make. Google rotates which reviews it returns, so multiple calls can capture more reviews.

### Option 2: Via Admin Dashboard
1. Go to `/admin/dashboard`
2. Look for review refresh options (if available)

### Option 3: Via API Call
```bash
curl http://localhost:3333/api/google-reviews/refresh?count=5
```

## Understanding the System

### Two Types of Reviews

1. **Archived Reviews** (`content/reviews.json`)
   - Stored locally in your project
   - Can contain ALL reviews (if using Business Profile API)
   - Automatically updated every 30 minutes
   - Used when available and fresh

2. **Live API Reviews** (Google Places API)
   - Fetched directly from Google
   - Limited to 5 reviews per request
   - Used to update the archive
   - Rotates which reviews are returned

### Why Multiple API Calls?

Google Places API rotates which reviews it returns. Making multiple calls (via the refresh endpoint) helps capture more reviews:
- Call 1 might return reviews A, B, C, D, E
- Call 2 might return reviews B, C, F, G, H
- Merging them gives you A, B, C, D, E, F, G, H

## Monitoring

Check the server console logs to see:
- When reviews are being refreshed
- How many new reviews were added
- Archive update status

Example log output:
```
Archive is stale (45 minutes old), fetching fresh reviews...
Fetch 1/3: Got 5 reviews
Fetch 2/3: Got 5 reviews
Fetch 3/3: Got 5 reviews
Archive updated: 25 total reviews (3 new unique reviews from 3 API calls, 22 were already archived)
```

## Troubleshooting

### Reviews Not Updating?

1. **Check cache**: Wait 1 minute for cache to expire
2. **Check archive age**: If archive is less than 30 minutes old, it won't refresh automatically
3. **Manual refresh**: Use the refresh endpoint to force an update
4. **Check logs**: Look at server console for errors

### New Reviews Not Showing?

1. **Only 5-star reviews display**: Lower ratings are filtered out
2. **Check archive**: New reviews might be in archive but not displayed if they're not 5-star
3. **Manual refresh**: Try the refresh endpoint with `count=5` or higher

### Archive Not Updating?

1. **Check file permissions**: Ensure `content/reviews.json` is writable
2. **Check API key**: Verify `GOOGLE_PLACES_API_KEY` is set correctly
3. **Check place ID**: Verify `GOOGLE_PLACE_ID` is correct

## Best Practices

1. **Let it run automatically**: The system handles updates automatically
2. **Manual refresh occasionally**: Use manual refresh weekly or when you know you have new reviews
3. **Monitor logs**: Check server logs periodically to ensure updates are working
4. **Use Business Profile API**: For best results, set up Business Profile API to get ALL reviews (not just 5)

## Production Considerations

In production:
- The 1-minute cache helps reduce API calls
- The 30-minute archive refresh ensures reviews stay current
- Consider setting up a cron job or scheduled task to call the refresh endpoint daily for extra assurance

Example cron job (runs daily at 2 AM):
```bash
0 2 * * * curl https://yourdomain.com/api/google-reviews/refresh?count=5
```
