import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.rail}>
          <p className={styles.eyebrow}>§01 · About</p>
          <div className={styles.sectionNum}>
            <span className={styles.numBig}>01</span>
            <span className={styles.numTotal}>/03</span>
          </div>
        </div>
        <div className={styles.body}>
          <h2 className={styles.h2}>
            A small studio that builds the software it wishes existed.
          </h2>
          <p className={styles.prose}>
            Metric House started in 2026 as a software company built around{' '}
            <em className={styles.productName}>Knowmad</em>, a remote-work discovery app, and grew
            into a second product, <em className={styles.productName}>Formulate</em>, when we
            realized the surveys we needed didn&apos;t exist either. Recruit came next, for the
            university subject pools that so much of that research depends on.
          </p>
          <p className={styles.prose}>
            That&apos;s the pattern. We notice a workflow that&apos;s quietly broken. The kind of
            thing people put up with because they think it&apos;s just how it is. We build the
            version we&apos;d actually want to use and ship it.
          </p>
          <div className={styles.principles}>
            <div className={styles.principle}>
              <p className={styles.principleNum}>01</p>
              <h4 className={styles.principleTitle}>Specific over general</h4>
              <p className={styles.principleBody}>
                Each product solves one problem well. We&apos;d rather make Knowmad excellent than
                build a platform.
              </p>
            </div>
            <div className={styles.principle}>
              <p className={styles.principleNum}>02</p>
              <h4 className={styles.principleTitle}>Quiet by default</h4>
              <p className={styles.principleBody}>
                No dark patterns, no growth-hacked notifications. The software gets out of your way.
              </p>
            </div>
            <div className={styles.principle}>
              <p className={styles.principleNum}>03</p>
              <h4 className={styles.principleTitle}>Independent</h4>
              <p className={styles.principleBody}>
                Self-funded so we can move slow on the things worth getting right.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
