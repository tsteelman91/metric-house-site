import styles from './About.module.css';

export function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.inner}>
        <div className={styles.rail}>
          <p className={styles.eyebrow}>§02 · About</p>
        </div>
        <div className={styles.body}>
          <h2 className={styles.h2}>A small studio that measures carefully.</h2>
          <p className={styles.prose}>
            Metric House is a small, independent studio in Chapel Hill. We started by building
            software for research: tools for writing better surveys and for running the subject
            pools that studies depend on.
          </p>
          <p className={styles.prose}>
            GEO comes from the same habit. Ask a question many times, look at what the answers rest
            on, and only trust a change that holds up. We do the work and explain it in plain
            English.
          </p>

          <div className={styles.person}>
            <img
              className={styles.avatar}
              src="/tyler-headshot.jpg"
              alt="Tyler Steelman"
              width={56}
              height={56}
            />
            <p>
              You&apos;ll talk with Tyler Steelman. Fifteen years measuring what people say, and
              telling a real change from noise. PhD in survey methodology. Based in the Chapel Hill
              area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
