# Fix Redirect URI Mismatch Error

## Error: `redirect_uri_mismatch`

This error occurs when the redirect URI in your Google Cloud Console doesn't exactly match the one your application is sending.

## Quick Fix Steps

### 1. Go to Google Cloud Console

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**

### 2. Edit Your OAuth 2.0 Client

1. Find your OAuth 2.0 Client ID (the one ending in `.apps.googleusercontent.com`)
2. Click on it to edit

### 3. Add the Redirect URI

In the **Authorized redirect URIs** section, add:

```
http://localhost:3333/api/auth/google/callback
```

**Important:**
- Must match **exactly** (including `http://` not `https://`)
- No trailing slashes
- Case-sensitive
- For production, you'll also need to add your production URL:
  ```
  https://yourdomain.com/api/auth/google/callback
  ```

### 4. Save Changes

1. Click **Save** at the bottom
2. Wait a few seconds for changes to propagate

### 5. Try Again

1. Go back to `/admin/google-business-setup`
2. Click "Connect Google Business Profile" again
3. The error should be resolved

## Common Mistakes

❌ **Wrong:** `http://localhost:3333/api/auth/google/callback/` (trailing slash)
❌ **Wrong:** `https://localhost:3333/api/auth/google/callback` (https instead of http)
❌ **Wrong:** `localhost:3333/api/auth/google/callback` (missing http://)
✅ **Correct:** `http://localhost:3333/api/auth/google/callback`

## Verify Your Current Redirect URI

Your application is configured to use:
```
http://localhost:3333/api/auth/google/callback
```

Make sure this **exact** string is in your Google Cloud Console.

## Still Having Issues?

1. **Clear browser cache** - Sometimes cached OAuth errors persist
2. **Check for typos** - Copy and paste the URI to avoid typos
3. **Wait a few minutes** - Google's changes can take a minute to propagate
4. **Check the error details** - Click "error details" in the Google error page for more info

