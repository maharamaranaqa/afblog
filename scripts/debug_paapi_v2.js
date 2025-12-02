require('dotenv').config({ path: '.env.local' });
const amazonPaapi = require('amazon-paapi');

const commonParameters = {
    AccessKey: process.env.AMAZON_ACCESS_KEY,
    SecretKey: process.env.AMAZON_SECRET_KEY,
    PartnerTag: process.env.AMAZON_PARTNER_TAG,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.co.jp',
};

console.log('--- Debugging PA-API Credentials ---');
console.log(`AccessKey: ${commonParameters.AccessKey ? commonParameters.AccessKey.substring(0, 5) + '...' : 'MISSING'}`);
console.log(`SecretKey: ${commonParameters.SecretKey ? 'PRESENT' : 'MISSING'}`);
console.log(`PartnerTag: ${commonParameters.PartnerTag}`);
console.log(`Region: ${commonParameters.Marketplace}`);
console.log('------------------------------------');

const requestParameters = {
    Keywords: 'Anker',
    SearchIndex: 'Electronics',
    ItemCount: 1,
    Resources: ['ItemInfo.Title']
};

amazonPaapi.SearchItems(commonParameters, requestParameters)
    .then(data => {
        console.log('Success!');
        console.log(JSON.stringify(data, null, 2));
    })
    .catch(error => {
        console.error('--- API Error Occurred ---');
        console.error('Error Message:', error.message);
        if (error.response) {
            console.error('Status:', error.response.status);
            // Try to find the body in different places
            console.error('Data:', JSON.stringify(error.response.data, null, 2));
        }
        console.log('--- Full Error Object ---');
        console.dir(error, { depth: 2 });
    });
