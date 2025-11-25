"use client";

import React, { useEffect, useState } from 'react';
import styles from './AdBanner.module.css';

interface AdBannerProps {
    slot: 'sidebar' | 'footer';
}

type AdDefinition = {
    id: string;
    content: JSX.Element;
    slots: ('sidebar' | 'footer')[];
};

const ADS: AdDefinition[] = [
    // Ad 1: A8.net 234x60 (Footer)
    {
        id: 'a8-234x60',
        slots: ['footer'],
        content: (
            <>
                <a href="https://px.a8.net/svt/ejp?a8mat=45IHH4+3E1VSI+0K+10A5LT" rel="nofollow">
                    <img
                        style={{ border: 'none' }}
                        width={234}
                        height={60}
                        alt=""
                        src="https://www21.a8.net/svt/bgt?aid=251125240205&wid=001&eno=01&mid=s00000000002006094000&mc=1"
                    />
                </a>
                <img
                    style={{ border: 'none' }}
                    width={1}
                    height={1}
                    src="https://www17.a8.net/0.gif?a8mat=45IHH4+3E1VSI+0K+10A5LT"
                    alt=""
                />
            </>
        ),
    },
    // Ad 2: Rakuten (Both)
    {
        id: 'rakuten',
        slots: ['sidebar', 'footer'],
        content: (
            <>
                <a href="https://rpx.a8.net/svt/ejp?a8mat=45IHH4+3F8R02+2HOM+6I9N5&rakuten=y&a8ejpredirect=http%3A%2F%2Fhb.afl.rakuten.co.jp%2Fhgc%2F0eb4779e.5d30c5ba.0eb4779f.b871e4e3%2Fa25112554428_45IHH4_3F8R02_2HOM_6I9N5%3Fpc%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F%26m%3Dhttp%253A%252F%252Ftravel.rakuten.co.jp%252F" rel="nofollow">
                    <img
                        src="http://hbb.afl.rakuten.co.jp/hsb/0ea7f9a4.79280dcb.0ea7f99d.1ac92fca/153145/"
                        style={{ border: 'none' }}
                        alt=""
                    />
                </a>
                <img
                    style={{ border: 'none' }}
                    width={1}
                    height={1}
                    src="https://www14.a8.net/0.gif?a8mat=45IHH4+3F8R02+2HOM+6I9N5"
                    alt=""
                />
            </>
        ),
    },
    // Ad 3: A8.net 300x300 (Sidebar)
    {
        id: 'a8-300x300',
        slots: ['sidebar'],
        content: (
            <>
                <a href="https://px.a8.net/svt/ejp?a8mat=45IHH4+3GFM7M+1WP2+1HPXWX" rel="nofollow">
                    <img
                        style={{ border: 'none' }}
                        width={300}
                        height={300}
                        alt=""
                        src="https://www23.a8.net/svt/bgt?aid=251125240209&wid=001&eno=01&mid=s00000008903009023000&mc=1"
                    />
                </a>
                <img
                    style={{ border: 'none' }}
                    width={1}
                    height={1}
                    src="https://www11.a8.net/0.gif?a8mat=45IHH4+3GFM7M+1WP2+1HPXWX"
                    alt=""
                />
            </>
        ),
    },
    // Ad 4: A8.net 120x60 (Footer)
    {
        id: 'a8-120x60',
        slots: ['footer'],
        content: (
            <>
                <a href="https://px.a8.net/svt/ejp?a8mat=45IHH4+3GFM7M+1WP2+1HO0GX" rel="nofollow">
                    <img
                        style={{ border: 'none' }}
                        width={120}
                        height={60}
                        alt=""
                        src="https://www25.a8.net/svt/bgt?aid=251125240209&wid=001&eno=01&mid=s00000008903009014000&mc=1"
                    />
                </a>
                <img
                    style={{ border: 'none' }}
                    width={1}
                    height={1}
                    src="https://www14.a8.net/0.gif?a8mat=45IHH4+3GFM7M+1WP2+1HO0GX"
                    alt=""
                />
            </>
        ),
    },
    // Ad 5: A8.net 120x90 (Sidebar)
    {
        id: 'a8-120x90',
        slots: ['sidebar'],
        content: (
            <>
                <a href="https://px.a8.net/svt/ejp?a8mat=45IHH4+3ENBEA+1WP2+6DZBL" rel="nofollow">
                    <img
                        style={{ border: 'none' }}
                        width={120}
                        height={90}
                        alt=""
                        src="https://www22.a8.net/svt/bgt?aid=251125240206&wid=001&eno=01&mid=s00000008903001073000&mc=1"
                    />
                </a>
                <img
                    style={{ border: 'none' }}
                    width={1}
                    height={1}
                    src="https://www10.a8.net/0.gif?a8mat=45IHH4+3ENBEA+1WP2+6DZBL"
                    alt=""
                />
            </>
        ),
    },
];

const AdBanner: React.FC<AdBannerProps> = ({ slot }) => {
    const [ad, setAd] = useState<AdDefinition | null>(null);

    useEffect(() => {
        // Filter ads that support the current slot
        const availableAds = ADS.filter((a) => a.slots.includes(slot));
        if (availableAds.length > 0) {
            // Randomly select one
            const randomIndex = Math.floor(Math.random() * availableAds.length);
            setAd(availableAds[randomIndex]);
        }
    }, [slot]);

    if (!ad) return null;

    return (
        <div className={`${styles.container} ${styles[slot]}`}>
            <span className={styles.label}>Advertisement</span>
            {ad.content}
        </div>
    );
};

export default AdBanner;
