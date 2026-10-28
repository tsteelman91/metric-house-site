import { GeoCard } from './GeoCard';
import { GeoForm } from './GeoForm';
import styles from './Geo.module.css';

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

export function Geo() {
  return (
    <section id="geo" className={styles.geo}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.pulse} aria-hidden="true" />
              §03 · GEO · AI search
            </p>
            <h2 className={styles.h2}>
              People ask AI where to go now. <em>Does it name you?</em>
            </h2>
            <p className={styles.lede}>
              Your customers are asking ChatGPT and Gemini for the best coffee in town, a plumber
              who shows up, a dentist who takes their insurance. The answer is a short list, and
              which businesses make it depends largely on what it can find about them online.
            </p>
            <p className={styles.lede}>
              This one is a service, not an app. We show you where you stand today and work on the
              parts that are in your control.
            </p>
          </div>
          <GeoCard />
        </div>

        <div className={styles.how}>
          <div className={styles.side}>
            <p className={styles.eyebrow}>How we work</p>
            <h3 className={styles.h3}>
              Measured first, <em>then</em> changed.
            </h3>
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
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                </div>
                <p className={styles.stepBody}>{step.body}</p>
              </li>
            ))}
          </ol>
          <p className={styles.offer}>
            You get a short written report: where you show up today, what those answers rely on,
            and what we&apos;d change first.
          </p>
        </div>

        <div className={styles.consult}>
          <div>
            <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>Consultation</p>
            <h3 className={styles.consultH3}>
              Start with <em>a conversation.</em>
            </h3>
            <p className={styles.consultBody}>
              Tell us a little about your business. We will set up a time to talk through what your
              customers are likely asking and whether this is a good fit for you.
            </p>
            <div className={styles.person}>
              <img
                className={styles.avatar}
                src="/tyler-headshot.jpg"
                alt="Tyler Steelman"
                width={48}
                height={48}
              />
              <p>
                You&apos;ll talk with Tyler Steelman. Fifteen years measuring what people say, and
                telling a real change from noise. PhD in survey methodology. Based in the Chapel
                Hill area.
              </p>
            </div>
          </div>
          <GeoForm />
        </div>
      </div>
    </section>
  );
}
