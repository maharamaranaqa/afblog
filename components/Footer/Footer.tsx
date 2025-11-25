import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                    <Link href="/terms" className={styles.link}>Terms of Service</Link>
                    <Link href="/contact" className={styles.link}>Contact</Link>
                </div>
                <p className={styles.copyright}>
                    &copy; {new Date().getFullYear()} AFBlog. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
