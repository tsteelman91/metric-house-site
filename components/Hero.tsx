import { GeoCard } from './GeoCard';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.left}>
            <p className={styles.eyebrow}>
              <span className={styles.pulse} aria-hidden="true" />
              Metric House · Chapel Hill, NC
            </p>
            <h1 className={styles.h1}>
              People ask AI where to go now. <em>Does it name you?</em>
            </h1>
            <p className={styles.lede}>
              Your customers are asking ChatGPT and Gemini for the best coffee in town, a plumber
              who shows up, a dentist who takes their insurance. The answer is a short list, and
              which businesses make it depends largely on what it can find about them online.
            </p>
            <p className={styles.lede}>
              We show you where you stand today and work on the parts that are in your control.
            </p>
            <div className={styles.ctaRow}>
              <a href="#contact" className={styles.primaryCta}>Set up a call →</a>
              <a href="#geo" className={styles.ghostCta}>How it works ↓</a>
            </div>
          </div>
          <GeoCard />
        </div>

        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>For</dt>
            <dd className={styles.metaValue}>Local and small businesses</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>What you get</dt>
            <dd className={styles.metaValue}>A plain-English report</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Based</dt>
            <dd className={styles.metaValue}>Chapel Hill, NC</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Also</dt>
            <dd className={styles.metaValue}>
              <a href="#products" className={styles.metaLink}>Software for research teams</a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
