import Link from 'next/link';
import styles from './PostCard.module.css';
import { PostData } from '@/lib/posts';

export default function PostCard({ post }: { post: Omit<PostData, 'content'> }) {
    return (
        <Link href={`/blog/${post.slug}`} className={styles.card}>
            <article>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDate}>{post.date}</p>
                <p className={styles.cardDescription}>{post.description}</p>
                {post.tags && (
                    <div className={styles.tags}>
                        {post.tags.map(tag => (
                            <span key={tag} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}
            </article>
        </Link>
    );
}
