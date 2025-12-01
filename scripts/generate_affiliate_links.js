require('dotenv').config({ path: '.env.local' });
const amazonPaapi = require('amazon-paapi');
const fs = require('fs');
const path = require('path');

// Check credentials
if (!process.env.AMAZON_ACCESS_KEY || !process.env.AMAZON_SECRET_KEY || !process.env.AMAZON_PARTNER_TAG) {
    console.error('Error: Missing Amazon PA-API credentials in .env.local');
    process.exit(1);
}

const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp',
};

// Categories to fetch popular items from
const CATEGORIES = [
    { index: 'Electronics', keywords: 'Anker' }, // High conversion
    { index: 'Kitchen', keywords: '便利グッズ' },
    { index: 'HealthPersonalCare', keywords: 'プロテイン' },
    { index: 'Computers', keywords: 'マウス' },
    { index: 'FoodAndBeverage', keywords: '業務用' }, // Bulk buying
];

const TODO_FILE = path.join(__dirname, '../todo.md');

async function fetchAndSave() {
    console.log('Starting automated product discovery...');
    let newLinks = [];

    for (const cat of CATEGORIES) {
        console.log(`Fetching popular items for: ${cat.index} (${cat.keywords})...`);

        const requestParameters = {
            Keywords: cat.keywords,
            SearchIndex: cat.index,
            ItemCount: 2, // Get top 2 items
            SortBy: 'AvgCustomerReviews', // Get highly rated items
            Resources: [
                'ItemInfo.Title',
                'DetailPageURL',
                'ItemInfo.ProductInfo'
            ]
        };

        try {
            const data = await amazonPaapi.SearchItems(commonParameters, requestParameters);

            if (data.SearchResult && data.SearchResult.Items) {
                for (const item of data.SearchResult.Items) {
                    const title = item.ItemInfo.Title.DisplayValue;
                    const url = item.DetailPageURL;

                    console.log(`Found: ${title.substring(0, 30)}...`);
                    newLinks.push(`- [ ] [${title}](${url}) <!-- Auto-fetched: ${cat.index} -->`);
                }
            } else {
                console.log('No items found (Check API quota or keywords).');
            }
        } catch (error) {
            console.error(`API Error for ${cat.index}:`);
            if (error.response) {
                console.error(`Status: ${error.response.status}`);
                console.error(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
            } else {
                console.error(error.message);
            }
            // If we hit a rate limit or quota issue, stop trying
            if (error.message.includes('429') || error.message.includes('503')) {
                console.error('Stopping due to rate limit/quota.');
                break;
            }
        }

        // Sleep to respect rate limits (1 request per second is safe)
        await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (newLinks.length > 0) {
        console.log(`\nAppending ${newLinks.length} items to todo.md...`);
        const contentToAppend = '\n\n## Auto-Fetched Popular Products\n' + newLinks.join('\n') + '\n';
        fs.appendFileSync(TODO_FILE, contentToAppend);
        console.log('Success! Please check todo.md');
    } else {
        console.log('No new items were saved. Please check the error logs above.');
    }
}

fetchAndSave();
