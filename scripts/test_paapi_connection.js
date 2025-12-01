require('dotenv').config({ path: '.env.local' });
const amazonPaapi = require('amazon-paapi');

// 1. Check if env vars are loaded
console.log('--- Checking Environment Variables ---');
console.log('Access Key Length:', process.env.AMAZON_ACCESS_KEY ? process.env.AMAZON_ACCESS_KEY.length : 'MISSING');
console.log('Secret Key Length:', process.env.AMAZON_SECRET_KEY ? process.env.AMAZON_SECRET_KEY.length : 'MISSING');
console.log('Partner Tag:', process.env.AMAZON_PARTNER_TAG || 'MISSING');
console.log('--------------------------------------\n');

const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp', // Ensure this matches your account region
};

const requestParameters = {
    Keywords: 'Anker',
    SearchIndex: 'Electronics',
    ItemCount: 1,
    Resources: ['ItemInfo.Title']
};

async function testConnection() {
    console.log('Attempting simple SearchItems request...');
    try {
        const data = await amazonPaapi.SearchItems(commonParameters, requestParameters);
        console.log('SUCCESS! Connection established.');
        console.log('First Item:', data.SearchResult.Items[0].ItemInfo.Title.DisplayValue);
    } catch (error) {
        console.error('\n!!! CONNECTION FAILED !!!');
        console.error('Error Message:', error.message);

        if (error.response) {
            console.error('HTTP Status:', error.response.status);
            // Try to parse the body if it exists
            if (error.response.text) {
                console.error('Response Body (Text):', error.response.text);
            } else if (error.response.data) {
                console.error('Response Body (Data):', JSON.stringify(error.response.data, null, 2));
            }
        }

        console.log('\n--- Troubleshooting Tips for 403 Error ---');
        console.log('1. [Most Common] Have you made 3 qualifying sales in the last 180 days?');
        console.log('   PA-API access is BLOCKED until you generate 3 sales via normal affiliate links.');
        console.log('2. Are you using the correct Access Key and Secret Key for the JAPAN (co.jp) store?');
        console.log('   Keys for amazon.com (US) will NOT work for amazon.co.jp.');
        console.log('3. Is your Partner Tag correct? (e.g., something-22)');
    }
}

testConnection();
