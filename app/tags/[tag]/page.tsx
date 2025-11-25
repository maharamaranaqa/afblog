import { getAllTags, getSortedPostsData } from '@/lib/posts';
import PostCard from '@/components/PostCard/PostCard';
import styles from './page.module.css';
import { Metadata } from 'next';

interface Props {
    params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    return {
        title: `Posts tagged "${decodedTag}" | AFBlog`,
        description: `Browse all articles tagged with ${decodedTag}.`,
    };
}

export async function generateStaticParams() {
    const tags = getAllTags();
    return tags.map((tag) => ({
        tag: tag,
    }));
}

export default async function TagPage({ params }: Props) {
    const { tag } = await params;
    const decodedTag = decodeURIComponent(tag);
    const allPosts = getSortedPostsData();
    const filteredPosts = allPosts.filter(post => post.tags?.includes(decodedTag));

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Tag: #{decodedTag}</h1>
            <div className={styles.grid}>
                {filteredPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                ))}
                {filteredPosts.length === 0 && <p>No posts found with this tag.</p>}
            </div>
        </div>
    );
}
