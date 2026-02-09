# Fix "Access Blocked - App Not Verified" Error

## Error: `access_denied` - App in Testing Mode

This error occurs when your OAuth app is in "Testing" mode and the user's email hasn't been added as a test user.

## Quick Fix: Add Test User

### Step 1: Go to OAuth Consent Screen

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **OAuth consent screen**

### Step 2: Add Test User

1. Scroll down to the **"Test users"** section
2. Click **"+ ADD USERS"**
3. Enter the email address: `sage.perry.admassist@gmail.com`
4. Click **"ADD"**
5. The user will now be able to access the app

### Step 3: Try Again

1. Go back to `/admin/google-business-setup`
2. Click "Connect Google Business Profile" again
3. The error should be resolved

## Important Notes

### Testing Mode vs Published

- **Testing Mode:** Only test users can access the app (current state)
- **Published:** Anyone with a Google account can access (requires verification)

### For Development/Testing

- **Testing mode is fine** for development
- Just add all email addresses that need access as test users
- No verification required for testing mode

### For Production

- You'll need to submit the app for verification
- This can take several weeks
- Google will review your app and use case
- Once verified, anyone can use it

## Multiple Test Users

If you need to add multiple test users:
1. Click **"+ ADD USERS"** for each email
2. Add them one at a time or comma-separated (depending on Google's interface)
3. All test users will be able to access the app

## Current Test User Email

Based on the error, add this email:
```
sage.perry.admassist@gmail.com
```

