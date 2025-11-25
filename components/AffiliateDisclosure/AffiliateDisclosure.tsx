import styles from './AffiliateDisclosure.module.css';

export default function AffiliateDisclosure() {
    return (
        <div className={styles.container}>
            <span className={styles.icon}>ⓘ</span>
            <p>
                この記事はプロモーションを含みます。本サイトはアフィリエイトプログラムに参加しており、記事内のリンクから商品を購入すると、売上の一部が還元されることがあります。
            </p>
        </div>
    );
}
