# Google Business Profile API Setup Guide

## Overview

The Google Business Profile API (formerly Google My Business API) allows you to access **all** your business reviews programmatically, unlike the Places API which only returns 5 reviews per request.

### Benefits
- ✅ Access to **all reviews** (not just 5)
- ✅ Real-time review data
- ✅ Ability to respond to reviews programmatically
- ✅ Access to business insights and analytics
- ✅ More reliable and comprehensive data

### Requirements
- Business must be verified on Google Business Profile
- OAuth 2.0 authentication setup
- Google Cloud Project with API enabled
- App verification (may be required for sensitive scopes)

---

## Step-by-Step Setup

### Step 1: Verify Your Business on Google

1. Go to [Google Business Profile](https://business.google.com/)
2. Sign in with the account that manages your business
3. If not verified, follow Google's verification process:
   - Usually involves receiving a postcard at your business address
   - Or phone/email verification
   - See: https://support.google.com/business/answer/7107242

### Step 2: Create Google Cloud Project

1. Navigate to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Nevada License Defense Website`
4. Click "Create"
5. Wait for project creation (may take a minute)

### Step 3: Enable Google Business Profile API

1. In your Google Cloud project, go to **APIs & Services** → **Library**
2. Search for **"Google Business Profile API"** (or "My Business API")
3. Click on it and click **"Enable"**
4. Wait for activation

**Note:** You may see a message that the API requires approval. You'll need to:
- Fill out the [API Access Request Form](https://support.google.com/business/answer/7674104)
- Explain your use case: "Displaying customer reviews on our website"
- Approval can take 3-7 business days

### Step 4: Configure OAuth Consent Screen

1. In Google Cloud Console, go to **APIs & Services** → **OAuth consent screen**
2. Choose **"External"** (unless you have a Google Workspace account)
3. Click **"Create"**

**Fill in the required information:**
- **App name:** `Nevada License Defense Website`
- **User support email:** Your email address
- **Developer contact information:** Your email address
- **App domain:** Your website domain (e.g., `nevadalicensedefense.com`)
- **Application homepage:** `https://yourdomain.com`
- **Privacy policy URL:** `https://yourdomain.com/privacy` (create if needed)
- **Terms of service URL:** `https://yourdomain.com/terms` (create if needed)

4. Click **"Save and Continue"**
5. On **Scopes** page, click **"Add or Remove Scopes"**
6. Add this scope:
   - `https://www.googleapis.com/auth/business.manage`
   - **Note:** The `businessprofileperformance` scope is not available/valid, so we only use `business.manage`
7. Click **"Save and Continue"**
8. On **Test users** page, add your Google account email (the one that manages the business)
9. Click **"Save and Continue"**
10. Review and **"Back to Dashboard"**

### Step 5: Create OAuth 2.0 Credentials

1. Go to **APIs & Services** → **Credentials**
2. Click **"Create Credentials"** → **"OAuth client ID"**
3. If prompted, configure the consent screen first (you already did this)
4. Choose **"Web application"** as application type
5. Name it: `Nevada License Defense - Web Client`
6. Under **Authorized redirect URIs**, add:
   - `http://localhost:3333/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
7. Click **"Create"**
8. **IMPORTANT:** Copy the **Client ID** and **Client Secret** immediately
   - You'll need these for your `.env.local` file
   - The secret is only shown once!

### Step 6: Request API Access (If Required)

1. Go to [Google Business Profile API Access Request](https://support.google.com/business/answer/7674104)
2. Fill out the form:
   - **Business name:** LV Nurse Attorney
   - **Use case:** Display customer reviews on our website
   - **Expected volume:** Low (just for displaying reviews)
3. Submit and wait for approval (3-7 business days)

### Step 7: Add Credentials to Your Project

Add these to your `.env.local` file:

```env
# Google Business Profile API (OAuth)
GOOGLE_BUSINESS_CLIENT_ID=your-client-id-here
GOOGLE_BUSINESS_CLIENT_SECRET=your-client-secret-here
GOOGLE_BUSINESS_REDIRECT_URI=http://localhost:3333/api/auth/google/callback

# Your Google account email (the one that manages the business)
GOOGLE_BUSINESS_ACCOUNT_EMAIL=your-email@gmail.com
```

---

## Implementation

The code is already implemented! You just need to complete the setup steps above.

### Install Required Package

The `googleapis` package is already installed. If you need to reinstall:

```bash
npm install googleapis
```

### Complete OAuth Flow

Once setup is complete:

1. **Start OAuth** - Visit `/admin/google-business-setup` and click "Connect Google Business Profile"
2. **Authorize** - Sign in with your Google account that manages the business
3. **Grant Permissions** - Allow the app to access your business data
4. **Fetch Reviews** - Reviews will be automatically fetched and archived
5. **Store Tokens** - The callback will return tokens (store them securely in production)

The system will:
- Fetch ALL reviews from your Google Business Profile
- Convert them to the standard format
- Merge with existing archived reviews
- Save to the archive automatically

---

## API Endpoints You'll Use

### Get Business Locations
```
GET https://mybusinessaccountmanagement.googleapis.com/v1/accounts
```

### Get Reviews for a Location
```
GET https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews
```

### Respond to a Review
```
PUT https://mybusiness.googleapis.com/v4/accounts/{accountId}/locations/{locationId}/reviews/{reviewId}/reply
```

---

## Important Notes

1. **Verification Required:** Your business must be verified before you can use the API
2. **OAuth Flow:** Users must authorize your app (one-time process)
3. **Token Management:** Access tokens expire; you'll need to refresh them
4. **Rate Limits:** API has rate limits; be mindful of usage
5. **Approval Time:** API access approval can take several days

---

## Troubleshooting

### "API not enabled" error
- Make sure you've enabled "Google Business Profile API" in Cloud Console
- Wait a few minutes after enabling for propagation

### "Access denied" error
- Ensure your business is verified on Google Business Profile
- Check that you're using the correct Google account
- Verify OAuth scopes are correct

### "Quota exceeded" error
- You may need to request quota increase
- Check your API usage in Cloud Console

### "App not verified" warning
- For testing, you can use test users
- For production, you'll need to submit for verification
- This can take several weeks

---

## Next Steps

After completing setup:
1. Install required npm packages (see implementation files)
2. Set up OAuth flow in your Next.js app
3. Create API routes to fetch reviews
4. Update your reviews component to use the new API
5. Test with your test user account

---

## Resources

- [Google Business Profile API Documentation](https://developers.google.com/my-business/content/overview)
- [OAuth 2.0 Setup Guide](https://developers.google.com/my-business/content/oauth-setup)
- [API Reference](https://developers.google.com/my-business/reference/rest)
- [Review Data Guide](https://developers.google.com/my-business/content/review-data)

