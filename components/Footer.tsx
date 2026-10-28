import { LogoMark } from './LogoMark';
import styles from './Footer.module.css';

const PRODUCTS = [
  { name: 'Knowmad', href: 'https://knowmad.work' },
  { name: 'Formulate', href: 'https://formulatesurveys.com' },
  { name: 'Recruit', href: 'https://recruit.metric-house.com' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>
              <LogoMark />
              <span className={styles.brandName}>Metric House, LLC</span>
            </div>
            <p className={styles.tagline}>
              Independent studio in Chapel Hill. Careful measurement for local businesses, and
              software for research.
            </p>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>GEO</p>
            <a href="#geo" className={styles.colLink}>How it works</a>
            <a href="#contact" className={styles.colLink}>Set up a call</a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Products</p>
            {PRODUCTS.map((p) => (
              <a
                key={p.name}
                href={p.href}
                className={styles.colLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.name} ↗
              </a>
            ))}
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Company</p>
            <a href="#about" className={styles.colLink}>About</a>
            <a href="#contact" className={styles.colLink}>Contact</a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Reach us</p>
            <a href="mailto:metrichousellc@gmail.com" className={styles.colLink}>
              metrichousellc@gmail.com
            </a>
            <span className={styles.colMuted}>Chapel Hill, NC</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Metric House, LLC · All rights reserved</span>
          <span>Est. 2026 · Made in NC</span>
        </div>
      </div>
    </footer>
  );
}
