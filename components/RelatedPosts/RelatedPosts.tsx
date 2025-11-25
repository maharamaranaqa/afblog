import React from 'react';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import styles from './RelatedPosts.module.css';

interface RelatedPostsProps {
    posts: Omit<PostData, 'content'>[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
    if (posts.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>関連記事</h3>
            <div className={styles.grid}>
                {posts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                        <div className={styles.content}>
                            <h4 className={styles.postTitle}>{post.title}</h4>
                            <time className={styles.date}>{post.date}</time>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RelatedPosts;
