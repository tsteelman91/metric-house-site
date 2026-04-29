import { LogoMark } from './LogoMark';
import styles from './Footer.module.css';

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
              Independent software studio. Building the tools we wish existed, one workflow at a
              time.
            </p>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Products</p>
            <a
              href="https://knowmad.work"
              className={styles.colLink}
              target="_blank"
              rel="noopener"
            >
              Knowmad ↗
            </a>
            <a
              href="https://formulatesurveys.com"
              className={styles.colLink}
              target="_blank"
              rel="noopener"
            >
              Formulate ↗
            </a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Company</p>
            <a href="#about" className={styles.colLink}>About</a>
            <a href="#contact" className={styles.colLink}>Contact</a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>Reach us</p>
            <a href="mailto:info@metric-house.com" className={styles.colLink}>
              info@metric-house.com
            </a>
            <span className={styles.colMuted}>Chapel Hill, NC</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2026 Metric House, LLC · All rights reserved</span>
          <span>v1.0 · Made in NC</span>
        </div>
      </div>
    </footer>
  );
}
