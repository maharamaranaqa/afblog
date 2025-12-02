'use client';

import { useEffect, useState } from 'react';
import styles from './TableOfContents.module.css';

export default function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    useEffect(() => {
        requestAnimationFrame(() => {
            const elements = Array.from(document.querySelectorAll('h2, h3'));
            const idCounts: { [key: string]: number } = {};

            const headingData = elements.map((elem) => {
                let baseId = elem.id || elem.textContent?.toLowerCase().replace(/\s+/g, '-') || 'heading';
                // Remove existing numbers if they look like auto-generated ones to avoid double suffixing
                baseId = baseId.replace(/-\d+$/, '');

                let id = baseId;
                if (idCounts[baseId]) {
                    id = `${baseId}-${idCounts[baseId]}`;
                    idCounts[baseId]++;
                } else {
                    idCounts[baseId] = 1;
                }

                return {
                    id,
                    text: elem.textContent || '',
                    level: Number(elem.tagName.charAt(1)),
                };
            });

            // Add IDs to elements if missing or update if duplicate
            elements.forEach((elem, index) => {
                if (!elem.id || elem.id !== headingData[index].id) {
                    elem.id = headingData[index].id;
                }
            });

            setHeadings(headingData);
        });
    }, []);

    if (!headings || !Array.isArray(headings) || headings.length === 0) return null;

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
