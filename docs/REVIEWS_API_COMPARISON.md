# Google Reviews API Comparison

## Two Approaches Available

### 1. Google Places API (Currently Implemented) ✅

**Status:** Working now

**Pros:**
- ✅ Easy to set up (just needs API key)
- ✅ No OAuth required
- ✅ No business verification needed
- ✅ Works immediately

**Cons:**
- ❌ Only returns **5 reviews** per API call
- ❌ Requires multiple calls to accumulate all reviews
- ❌ Less reliable for getting all reviews

**Setup:**
- Just add `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` to `.env.local`
- That's it!

**Files:**
- `app/api/google-reviews/route.ts` - Main endpoint
- `app/api/google-reviews/refresh/route.ts` - Multiple calls to accumulate reviews
- `lib/reviews.ts` - Archive management

---

### 2. Google Business Profile API (New Option) 🆕

**Status:** Requires setup (see guide)

**Pros:**
- ✅ Returns **ALL reviews** in one call
- ✅ More reliable and comprehensive
- ✅ Real-time data
- ✅ Can respond to reviews programmatically
- ✅ Access to business analytics

**Cons:**
- ❌ Requires OAuth 2.0 setup
- ❌ Business must be verified
- ❌ May require API access approval (3-7 days)
- ❌ More complex setup

**Setup:**
- Follow `docs/GOOGLE_BUSINESS_PROFILE_API_SETUP.md`
- Add OAuth credentials to `.env.local`
- Complete OAuth flow once
- Store tokens securely

**Files:**
- `lib/google-business-profile.ts` - API client
- `app/api/auth/google/route.ts` - OAuth initiation
- `app/api/auth/google/callback/route.ts` - OAuth callback
- `app/admin/google-business-setup/page.tsx` - Admin UI

---

## Which Should You Use?

### Use Places API if:
- You want to get started immediately
- You have fewer than 20 reviews
- You don't want to deal with OAuth
- You're okay with making multiple API calls

### Use Business Profile API if:
- You have many reviews (20+)
- You want all reviews reliably
- You want to respond to reviews programmatically
- You're willing to complete the setup process

---

## Migration Path

You can use both! The archive system (`lib/reviews.ts`) works with both APIs.

1. Start with Places API (current setup)
2. Set up Business Profile API when ready
3. Use Business Profile API to fetch all reviews once
4. Archive system will merge them automatically
5. Continue using whichever API you prefer

---

## Environment Variables

### For Places API:
```env
GOOGLE_PLACES_API_KEY=your-api-key
GOOGLE_PLACE_ID=your-place-id
```

### For Business Profile API:
```env
GOOGLE_BUSINESS_CLIENT_ID=your-client-id
GOOGLE_BUSINESS_CLIENT_SECRET=your-client-secret
GOOGLE_BUSINESS_REDIRECT_URI=http://localhost:3333/api/auth/google/callback
```

### Both can coexist:
```env
# Places API (current)
GOOGLE_PLACES_API_KEY=...
GOOGLE_PLACE_ID=...

# Business Profile API (optional)
GOOGLE_BUSINESS_CLIENT_ID=...
GOOGLE_BUSINESS_CLIENT_SECRET=...
GOOGLE_BUSINESS_REDIRECT_URI=...
```

---

## Next Steps

1. **If using Places API:** You're all set! Use the refresh endpoint to accumulate reviews.

2. **If setting up Business Profile API:**
   - Follow `docs/GOOGLE_BUSINESS_PROFILE_API_SETUP.md`
   - Visit `/admin/google-business-setup` to start OAuth flow
   - Complete authorization
   - Reviews will be fetched and archived automatically

