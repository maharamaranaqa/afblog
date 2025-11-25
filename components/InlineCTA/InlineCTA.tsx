import styles from './InlineCTA.module.css';

interface InlineCTAProps {
    href: string;
    text: string;
}

export default function InlineCTA({ href, text }: InlineCTAProps) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            {text}
            <span className={styles.icon}>→</span>
        </a>
    );
}
