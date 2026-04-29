import { LogoMark } from './LogoMark';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <header className={styles.nav}>
      <div className={styles.inner}>
        <a href="#top" className={styles.brand} aria-label="Metric House home">
          <LogoMark />
          <span className={styles.brandName}>Metric House</span>
        </a>
        <nav className={styles.links} aria-label="Main navigation">
          <a href="#about" className={styles.navLink}>About</a>
          <a href="#products" className={styles.navLink}>Products</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
          <a href="mailto:info@metric-house.com" className={styles.cta}>Get in touch</a>
        </nav>
      </div>
    </header>
  );
}
