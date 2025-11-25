import { getPostData, getSortedPostsData } from '@/lib/posts';
import styles from './page.module.css';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ProductCard from '@/components/ProductCard/ProductCard';
import TableOfContents from '@/components/TableOfContents/TableOfContents';
import AffiliateDisclosure from '@/components/AffiliateDisclosure/AffiliateDisclosure';
import InlineCTA from '@/components/InlineCTA/InlineCTA';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const postData = getPostData(slug);

    return {
        title: `${postData.title} | AFBlog`,
        description: postData.description,
        openGraph: {
            title: postData.title,
            description: postData.description,
            type: 'article',
            publishedTime: postData.date,
            tags: postData.tags,
        },
    };
}

export async function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

const components = {
    ProductCard,
    InlineCTA,
};

export default async function Post({ params }: Props) {
    const { slug } = await params;
    const postData = getPostData(slug);

    return (
        <div className={styles.container}>
            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <time>{postData.date}</time>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>
                    <h1 className={styles.title}>{postData.title}</h1>
                    {postData.tags && (
                        <div className={styles.tags}>
                            {postData.tags.map(tag => (
                                <span key={tag} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    )}
                </header>

                <div className={styles.content}>
                    <AffiliateDisclosure />
                    <MDXRemote source={postData.content} components={components} />

                    <div className={styles.author}>
                        <div className={styles.authorAvatar} />
                        <div className={styles.authorInfo}>
                            <h4>Written by Editor</h4>
                            <p>Tech enthusiast and audiophile. Dedicated to finding the best products for your lifestyle.</p>
                        </div>
                    </div>
                </div>
            </main>

            <aside>
                <TableOfContents />
            </aside>
        </div>
    );
}
