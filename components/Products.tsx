// components/Products.tsx
import styles from './Products.module.css';

function KnowmadMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <img
        src="/knowmad-screenshot.png"
        alt=""
        className={styles.screenshot}
      />
    </div>
  );
}

function FormulateMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <img
        src="/formulate-screenshot.png"
        alt=""
        className={styles.screenshot}
      />
    </div>
  );
}

function RecruitMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <img
        src="/recruit-screenshot.png"
        alt=""
        className={styles.screenshot}
      />
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className={styles.products}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>§02 · Products</p>
            <h2 className={styles.h2}>Three things, made well.</h2>
          </div>
          <p className={styles.headerNote}>
            Each is independently developed and supported by Metric House. Click through for full
            product sites.
          </p>
        </div>

        <article className={styles.card}>
          <div className={styles.cardMeta}>
            <div className={styles.productTag}>
              <span className={styles.productNum}>P/01</span>
              <span className={styles.productStatus}>Live in NC Triangle</span>
            </div>
            <h3 className={styles.productName}>Knowmad</h3>
            <p className={styles.tagline}>
              Find the right place to work. Today, near you.
            </p>
            <p className={styles.blurb}>
              Tell Knowmad what you need: focus work, light tasks, solo or with a group. It matches
              you with cafés, libraries, and coworking spots nearby that actually fit. No more
              rolling the dice on a noisy bakery at 9am.
            </p>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Coverage</dt>
                <dd className={styles.statValue}>Chapel Hill · Durham · Carrboro</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>For</dt>
                <dd className={styles.statValue}>Remote &amp; hybrid workers</dd>
              </div>
            </dl>
            <a
              href="https://knowmad.work"
              className={styles.productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit knowmad.work</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
          <KnowmadMockup />
        </article>

        <article className={styles.card}>
          <div className={styles.cardMeta}>
            <div className={styles.productTag}>
              <span className={styles.productNum}>P/02</span>
              <span className={styles.productStatus}>Live</span>
            </div>
            <h3 className={styles.productName}>Formulate</h3>
            <p className={styles.tagline}>
              The AI-powered survey teammate you need to develop, deploy, and analyze your work.
            </p>
            <p className={styles.blurb}>
              Trained on PhD-level and corporate-level knowledge and experience, Formulate gives you
              the methodology guardrails to generate the insights you actually need. It catches the
              leading questions, vague scales, and double-barreled prompts before your respondents
              ever see them.
            </p>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Stage</dt>
                <dd className={styles.statValue}>Live</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>For</dt>
                <dd className={styles.statValue}>Researchers, PMs, ops teams</dd>
              </div>
            </dl>
            <a
              href="https://formulatesurveys.com"
              className={styles.productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit formulatesurveys.com</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
          <FormulateMockup />
        </article>

        <article className={styles.card}>
          <div className={styles.cardMeta}>
            <div className={styles.productTag}>
              <span className={styles.productNum}>P/03</span>
              <span className={styles.productStatus}>Now piloting</span>
            </div>
            <h3 className={styles.productName}>Recruit</h3>
            <p className={styles.tagline}>
              Find the right people for research.
            </p>
            <p className={styles.blurb}>
              Recruit runs a university research subject pool in one place. Researchers submit
              studies for review, coordinators decide what fields and when, and students sign up
              and earn course credit that is tracked against the right class. Researchers never see
              student names or IDs, and survey responses stay in the researcher&apos;s own tool.
            </p>
            <dl className={styles.stats}>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>Stage</dt>
                <dd className={styles.statValue}>Pilot programs</dd>
              </div>
              <div className={styles.stat}>
                <dt className={styles.statLabel}>For</dt>
                <dd className={styles.statValue}>University subject pools</dd>
              </div>
            </dl>
            <a
              href="https://recruit.metric-house.com"
              className={styles.productLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Visit recruit.metric-house.com</span>
              <span className={styles.arrow}>→</span>
            </a>
          </div>
          <RecruitMockup />
        </article>
      </div>
    </section>
  );
}
