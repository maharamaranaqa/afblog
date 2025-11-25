import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags?: string[];
    content: string;
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
    // Get file names under /posts
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".mdx" from file name to get slug
        const slug = fileName.replace(/\.mdx$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the slug
        return {
            slug,
            ...(matterResult.data as { title: string; date: string; description: string; tags?: string[] }),
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllTags(): string[] {
    const posts = getSortedPostsData();
    const tags = new Set<string>();
    posts.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}

export function getPostData(slug: string): PostData {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    return {
        slug,
        content: matterResult.content,
        ...(matterResult.data as { title: string; date: string; description: string; tags?: string[] }),
    };
}

export function getRelatedPosts(currentSlug: string, tags: string[] = [], limit: number = 3): Omit<PostData, 'content'>[] {
    const allPosts = getSortedPostsData();

    // Filter out the current post
    const otherPosts = allPosts.filter(post => post.slug !== currentSlug);

    // Calculate relevance score based on matching tags
    const scoredPosts = otherPosts.map(post => {
        const postTags = post.tags || [];
        const matchingTags = postTags.filter(tag => tags.includes(tag));
        return {
            post,
            score: matchingTags.length
        };
    });

    // Sort by score (descending) and then by date (descending)
    scoredPosts.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (a.score < b.score) return 1;
        return a.post.date < b.post.date ? 1 : -1;
    });

    // Return top 'limit' posts, only if they have at least one matching tag
    // If no tags match, we could return recent posts, but for "Related", matching tags is better.
    // Let's return the top scored ones regardless of score > 0 to ensure we always show something if requested,
    // but ideally we want relevance. Let's filter for score > 0 first.
    const relevantPosts = scoredPosts.filter(item => item.score > 0);

    // If we don't have enough relevant posts, fill with recent posts
    let finalPosts = relevantPosts.map(item => item.post);

    if (finalPosts.length < limit) {
        const remainingCount = limit - finalPosts.length;
        const remainingPosts = otherPosts
            .filter(post => !finalPosts.includes(post))
            .slice(0, remainingCount);
        finalPosts = [...finalPosts, ...remainingPosts];
    }

    return finalPosts.slice(0, limit);
}
