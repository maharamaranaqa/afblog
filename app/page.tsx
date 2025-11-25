import styles from './page.module.css';
import { getSortedPostsData } from '@/lib/posts';
import PostCard from '@/components/PostCard/PostCard';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();
  const featuredPost = allPostsData[0]; // Assume first post is featured
  const remainingPosts = allPostsData.slice(1);

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.heroTitle} animate-fade-in`}>
            Elevate Your Lifestyle
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-in`}>
            Curated insights and premium product reviews for the discerning individual.
          </p>
        </div>
      </section>

      <div className={styles.container}>
        {featuredPost && (
          <section className={styles.featuredSection}>
            <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredImage} style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2940&q=80)' }} />
              <div className={styles.featuredContent}>
                <span className={styles.featuredLabel}>Featured Article</span>
                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                <p className={styles.featuredExcerpt}>{featuredPost.description}</p>
                <span className="btn btn-primary">Read Article</span>
              </div>
            </Link>
          </section>
        )}

        <h2 className={styles.sectionTitle}>Latest Articles</h2>
        <div className={styles.grid}>
          {remainingPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          {allPostsData.length === 0 && <p>No articles yet. Stay tuned!</p>}
        </div>
      </div>
    </div>
  );
}
