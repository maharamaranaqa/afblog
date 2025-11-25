import Image from 'next/image';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    title: string;
    description: string;
    price: string;
    imageUrl: string;
    affiliateLink: string;
    rating?: number;
    pros?: string[];
    cons?: string[];
}

export default function ProductCard({
    title,
    description,
    price,
    imageUrl,
    affiliateLink,
    rating = 5,
    pros = [],
    cons = [],
}: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.rating}>
                        {'★'.repeat(Math.floor(rating))}
                        {'☆'.repeat(5 - Math.floor(rating))}
                        <span>{rating.toFixed(1)}</span>
                    </div>
                </div>

                <p className={styles.description}>{description}</p>

                {(pros.length > 0 || cons.length > 0) && (
                    <div className={styles.lists}>
                        {pros.length > 0 && (
                            <div>
                                <h4 className={`${styles.listTitle} ${styles.prosTitle}`}>Pros</h4>
                                <ul className={styles.list}>
                                    {pros.map((pro, i) => <li key={i} className={styles.listItem}>{pro}</li>)}
                                </ul>
                            </div>
                        )}
                        {cons.length > 0 && (
                            <div>
                                <h4 className={`${styles.listTitle} ${styles.consTitle}`}>Cons</h4>
                                <ul className={styles.list}>
                                    {cons.map((con, i) => <li key={i} className={styles.listItem}>{con}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className={styles.footer}>
                    <span className={styles.price}>{price}</span>
                    <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className={styles.button}>
                        Check Price
                    </a>
                </div>
            </div>
        </div>
    );
}
