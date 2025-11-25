'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

export default function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => {
            const elements = Array.from(document.querySelectorAll('h2, h3'));
            const headingData = elements.map((elem) => ({
                id: elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
                text: elem.textContent || '',
                level: Number(elem.tagName.charAt(1)),
            }));

            // Add IDs to elements if missing
            elements.forEach((elem, index) => {
                if (!elem.id) {
                    elem.id = headingData[index].id;
                }
            });

            setHeadings(headingData);
        });
    }, []);

    if (headings.length === 0) return null;

    return (
        <nav className={styles.toc}>
            <h4 className={styles.title}>Table of Contents</h4>
            <ul className={styles.list}>
                {headings.map((heading) => (
                    <li key={heading.id} className={styles.item} style={{ paddingLeft: (heading.level - 2) * 16 }}>
                        <a href={`#${heading.id}`} className={styles.link}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
