/**
 * Utility script to refresh and accumulate Google reviews
 * 
 * This script makes multiple API calls to Google Places API to accumulate
 * more reviews than the 5-review limit per request.
 * 
 * Usage:
 *   npm run refresh-reviews
 *   npm run refresh-reviews -- --count 10
 * 
 * Or call the API directly:
 *   http://localhost:3333/api/google-reviews/refresh?count=5
 */

const https = require('https')
const http = require('http')

// Get count from command line args
const args = process.argv.slice(2)
const countArg = args.find(arg => arg.startsWith('--count='))
const count = countArg ? parseInt(countArg.split('=')[1], 10) : 5

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3333'

async function refreshReviews() {
  console.log(`\n🔄 Refreshing reviews (making ${count} API calls)...\n`)

  try {
    const url = `${SITE_URL}/api/google-reviews/refresh?count=${count}`
    const client = url.startsWith('https') ? https : http
    
    const response = await new Promise((resolve, reject) => {
      client.get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => { data += chunk })
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) })
          } catch (e) {
            reject(e)
          }
        })
      }).on('error', reject)
    })

    if (response.status !== 200) {
      console.error('❌ Error:', response.data)
      process.exit(1)
    }

    const data = response.data

    console.log('✅ Success!')
    console.log(`\n📊 Statistics:`)
    console.log(`   Total reviews in archive: ${data.stats.totalArchived}`)
    console.log(`   New reviews from this refresh: ${data.stats.newFromThisRefresh}`)
    console.log(`   API calls made: ${data.stats.apiCallsMade}`)
    console.log(`   Business: ${data.name}`)
    console.log(`   Rating: ${data.rating} (${data.totalRatings} total ratings)`)
    console.log(`\n💾 Archive updated: content/reviews.json`)
    console.log(`\n${data.message}\n`)
  } catch (error) {
    console.error('❌ Failed to refresh reviews:', error.message)
    console.error('\n💡 Make sure your dev server is running: npm run dev')
    process.exit(1)
  }
}

refreshReviews()

