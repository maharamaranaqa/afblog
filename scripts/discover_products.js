require('dotenv').config({ path: '.env.local' });
const amazonPaapi = require('amazon-paapi');
const fs = require('fs');
const path = require('path');

const CANDIDATES_FILE = path.join(__dirname, '../candidates.json');

const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp',
};

const CATEGORIES = [
    { index: 'Electronics', keywords: 'Anker' },
    { index: 'Kitchen', keywords: '便利グッズ' },
    { index: 'HealthPersonalCare', keywords: 'シャワーヘッド' },
    { index: 'Computers', keywords: 'ロジクール' },
];

async function discover() {
    console.log('Starting discovery...');
    let candidates = [];

    // Load existing candidates to avoid duplicates
    if (fs.existsSync(CANDIDATES_FILE)) {
        candidates = JSON.parse(fs.readFileSync(CANDIDATES_FILE, 'utf8'));
    }

    for (const cat of CATEGORIES) {
        console.log(`Searching ${cat.index} for "${cat.keywords}"...`);

        const requestParameters = {
            Keywords: cat.keywords,
            SearchIndex: cat.index,
            ItemCount: 3,
            SortBy: 'AvgCustomerReviews',
            Resources: [
                'ItemInfo.Title',
                'ItemInfo.Features',
                'ItemInfo.ProductInfo',
                'Images.Primary.Large',
                'Offers.Listings.Price',
                'DetailPageURL'
            ]
        };

        try {
            const data = await amazonPaapi.SearchItems(commonParameters, requestParameters);

            if (data.SearchResult && data.SearchResult.Items) {
                for (const item of data.SearchResult.Items) {
                    const asin = item.ASIN;
                    // Skip if already exists
                    if (candidates.find(c => c.asin === asin)) continue;

                    candidates.push({
                        asin: asin,
                        title: item.ItemInfo.Title.DisplayValue,
                        url: item.DetailPageURL,
                        imageUrl: item.Images?.Primary?.Large?.URL || '',
                        price: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || 'Check Price',
                        features: item.ItemInfo.Features?.DisplayValues || [],
                        category: cat.index,
                        fetchedAt: new Date().toISOString()
                    });
                    console.log(`Found: ${item.ItemInfo.Title.DisplayValue.substring(0, 30)}...`);
                }
            }
        } catch (error) {
            console.error(`Error fetching ${cat.index}:`, error.message);
            // Continue to next category even if one fails
        }

        await new Promise(r => setTimeout(r, 1500)); // Rate limit
    }

    fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(candidates, null, 2));
    console.log(`Saved ${candidates.length} candidates to candidates.json`);
}

discover();
