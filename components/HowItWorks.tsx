import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    title: 'Ask',
    body: 'We put the questions your customers actually ask to the major AI tools, many times and in different wordings, and record every answer.',
  },
  {
    num: '02',
    title: 'Trace',
    body: 'We look at what those answers lean on: which reviews, listings, articles and pages, and where your business is missing or described poorly.',
  },
  {
    num: '03',
    title: 'Improve',
    body: 'We work on what you control, like your own site, your listings and how your business is described across the web. No tricks that could backfire.',
  },
  {
    num: '04',
    title: 'Re-check',
    body: 'Same questions, asked the same way, a few weeks later. You see what moved and what did not, side by side.',
  },
];

export function HowItWorks() {
  return (
    <section id="geo" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.side}>
          <p className={styles.eyebrow}>§01 · How it works</p>
          <h2 className={styles.h2}>
            Measured first, <em>then</em> changed.
          </h2>
          <p className={styles.sideBody}>
            AI gives a different answer almost every time you ask, so one search tells you very
            little. So we ask carefully, ask often, and only call something a change when it holds
            up.
          </p>
          <p className={styles.tagline}>Plain-English reports · Triangle area businesses</p>
        </div>
        <ol className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.num} className={styles.step}>
              <div className={styles.stepHead}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
              </div>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
        <div className={styles.offer}>
          <p>
            You get a short written report: where you show up today, what those answers rely on,
            and what we&apos;d change first.
          </p>
          <a href="#contact" className={styles.callLink}>Set up a call →</a>
        </div>
      </div>
    </section>
  );
}
