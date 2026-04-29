import styles from './Hero.module.css';

export function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.eyebrow}>
            <span className={styles.dot} aria-hidden="true">●</span>
            Metric House, LLC · Est. 2026 · North Carolina
          </p>
          <h1 className={styles.h1}>
            Software for the<br />
            way people <em>actually</em><br />
            want to work.
          </h1>
          <p className={styles.subhead}>
            We build tools that fix specific, irritating problems in modern work. Finding a good
            place to focus. Writing a survey that won&apos;t embarrass you. Two products so far.
            More on the way.
          </p>
          <div className={styles.ctaRow}>
            <a href="#products" className={styles.primaryCta}>See our products ↓</a>
            <a href="mailto:info@metric-house.com" className={styles.ghostCta}>
              info@metric-house.com
            </a>
          </div>
        </div>
        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Studio</dt>
            <dd className={styles.metaValue}>Independent · self-funded</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Based</dt>
            <dd className={styles.metaValue}>Chapel Hill, NC</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Products live</dt>
            <dd className={styles.metaValue}>Knowmad, Formulate</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Hiring</dt>
            <dd className={styles.metaValue}>Not yet. Say hi anyway.</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
