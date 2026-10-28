import styles from './About.module.css';

const VALUES = [
  {
    num: '01',
    title: 'Specific over general',
    body: 'We do a few things and do them properly. No platform, no upsell ladder.',
  },
  {
    num: '02',
    title: 'Quiet by default',
    body: 'No tricks, no dark patterns, no growth hacks. In our software or in the work we do for you.',
  },
  {
    num: '03',
    title: 'Independent',
    body: 'Self-funded, so we can move slowly on the things worth getting right.',
  },
];

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
          <p className={styles.todo}>TODO(tyler): one sentence, in your words, on why you started GEO.</p>

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

          <div className={styles.principles}>
            {VALUES.map((value) => (
              <div key={value.num} className={styles.principle}>
                <p className={styles.principleNum}>{value.num}</p>
                <h3 className={styles.principleTitle}>{value.title}</h3>
                <p className={styles.principleBody}>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
