const fs = require('fs');
const path = require('path');

const CANDIDATES_FILE = path.join(__dirname, '../candidates.json');
const POSTS_DIR = path.join(__dirname, '../posts');

function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
}

function generateDraft() {
    if (!fs.existsSync(CANDIDATES_FILE)) {
        console.log('No candidates found. Run discover_products.js first.');
        return;
    }

    const candidates = JSON.parse(fs.readFileSync(CANDIDATES_FILE, 'utf8'));
    if (candidates.length === 0) {
        console.log('No candidates available.');
        return;
    }

    // Pick the first candidate
    const product = candidates.shift();
    const slug = slugify(product.title);
    const filename = `${slug}.mdx`;
    const filePath = path.join(POSTS_DIR, filename);

    if (fs.existsSync(filePath)) {
        console.log(`File ${filename} already exists. Skipping.`);
        // Put it back or discard? For now discard to avoid loop
    } else {
        const content = `---
title: '【レビュー】${product.title}'
date: '${new Date().toISOString().split('T')[0]}'
tags: ['${product.category}', 'Review']
description: '${product.title}の徹底レビュー。特徴、メリット、デメリットを解説します。'
---

## 3行でわかる本記事の要約

<div className="bg-gray-100 p-4 rounded-lg mb-8 border-l-4 border-blue-500">
  <p className="font-bold mb-2">この記事はこんな人におすすめ：</p>
  <ul className="list-disc list-inside mb-4">
    <li>この商品が気になっている人</li>
    <li>コスパの良い${product.category}を探している人</li>
  </ul>
  
  <p className="font-bold mb-2">最大のメリット：</p>
  <p className="mb-4">${product.features[0] || '高品質な機能'}</p>
  
  <p className="font-bold">結論（買うべきか）：</p>
  <p>間違いなく買いです。</p>
</div>

今回は、Amazonで高評価を獲得している**「${product.title}」**をご紹介します。

<ProductCard
  title="${product.title}"
  price="${product.price}"
  url="${product.url}"
  imageUrl="${product.imageUrl}"
/>

## 特徴

${product.features.map(f => `- ${f}`).join('\n')}

## まとめ

<ProductCard
  title="${product.title}"
  price="${product.price}"
  url="${product.url}"
  imageUrl="${product.imageUrl}"
/>
`;

        fs.writeFileSync(filePath, content);
        console.log(`Created draft: ${filename}`);
    }

    // Save remaining candidates
    fs.writeFileSync(CANDIDATES_FILE, JSON.stringify(candidates, null, 2));
}

generateDraft();
