import React from 'react';
import styles from './AdBanner.module.css';

interface AdBannerProps {
    slot: 'sidebar' | 'footer';
}

const AdBanner: React.FC<AdBannerProps> = ({ slot }) => {
    if (slot === 'sidebar') {
        return (
            <div className={`${styles.container} ${styles.sidebar}`}>
                <span className={styles.label}>Advertisement</span>
                {/* A8.net 300x300 */}
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
            </div>
        );
    }

    if (slot === 'footer') {
        return (
            <div className={`${styles.container} ${styles.footer}`}>
                <div>
                    <span className={styles.label}>Advertisement</span>
                    {/* A8.net 234x60 */}
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
                </div>
            </div>
        );
    }

    return null;
};

export default AdBanner;
