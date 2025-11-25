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
