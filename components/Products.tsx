// components/Products.tsx
import styles from './Products.module.css';

function KnowmadMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <div className={styles.browserChrome}>
        <div className={styles.chromeLeft}>
          <span className={styles.lockIcon}>▬</span>
          <span>knowmad.work</span>
        </div>
        <span className={styles.statusLive}>● live</span>
      </div>
      <div className={styles.browserBody}>
        <div className={styles.searchBar}>
          <span className={styles.searchText}>Today I want to do</span>
          <span className={styles.pillInk}>focus work</span>
          <span className={styles.pillPaper}>+ alone</span>
        </div>
        <div className={styles.map}>
          <div className={styles.pin} style={{ left: '22%', top: '38%' }}>
            <span className={styles.pinLabel}>Carrboro Library</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
          <div className={styles.pin} style={{ left: '48%', top: '56%' }}>
            <span className={styles.pinLabel}>Open Eye Café · 92% match</span>
            <span className={`${styles.pinDot} ${styles.pinDotWarm} ${styles.pinDotLarge}`} />
          </div>
          <div className={styles.pin} style={{ left: '74%', top: '32%' }}>
            <span className={styles.pinLabel}>Perennial · Durham</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
          <div className={styles.pin} style={{ left: '38%', top: '76%' }}>
            <span className={styles.pinLabel}>Looking Glass</span>
            <span className={`${styles.pinDot} ${styles.pinDotAccent}`} />
          </div>
        </div>
        <div className={styles.mapLegend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchWarm}`} />
            Best match
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendSwatch} ${styles.legendSwatchAccent}`} />
            Good fit
          </span>
          <span className={styles.legendRight}>4 spots within 2.4 mi</span>
        </div>
      </div>
    </div>
  );
}

function FormulateMockup() {
  return (
    <div className={styles.productVisual} aria-hidden="true">
      <div className={styles.browserChrome}>
        <div className={styles.chromeLeft}>
          <span className={styles.lockIcon}>▬</span>
          <span>formulatesurveys.com</span>
        </div>
        <span className={styles.statusComingSoon}>● coming soon</span>
      </div>
      <div className={styles.browserBody}>
        <div className={styles.docHeader}>
          <span>onboarding_v3.draft</span>
          <span className={styles.issuesFlagged}>2 issues flagged</span>
        </div>
        <div className={`${styles.question} ${styles.questionAccent}`}>
          <p className={styles.questionNum}>Q1</p>
          <p className={styles.questionText}>
            In the last 7 days, how many days did you open the app?{' '}
            <span className={styles.questionHint}>(0–7)</span>
          </p>
        </div>
        <div className={`${styles.question} ${styles.questionWarm}`}>
          <p className={styles.questionNum}>Q2 · Leading</p>
          <p className={styles.questionText}>
            Wouldn&apos;t you agree that our{' '}
            <mark className={styles.highlight}>new dashboard is a major improvement</mark>?
          </p>
          <p className={styles.questionFlag}>
            → rewrite as neutral comparison · cite: Schuman &amp; Presser 1981
          </p>
        </div>
        <div className={`${styles.question} ${styles.questionWarm}`}>
          <p className={styles.questionNum}>Q3 · Double-barreled</p>
          <p className={styles.questionText}>
            How satisfied are you with our{' '}
            <mark className={styles.highlight}>pricing and support</mark>?
          </p>
          <p className={styles.questionFlag}>
            → split into two questions · cite: DeVellis 2017
          </p>
        </div>
      </div>
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
            <h2 className={styles.h2}>Two things, made well.</h2>
          </div>
          <p className={styles.headerNote}>
            Both are independently developed and supported by Metric House. Click through for full
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
              A remote-work discovery app for finding the right place to work — today, near you.
            </p>
            <p className={styles.blurb}>
              Tell Knowmad what kind of work you&apos;re doing — focus, light, alone, with a group
              — and it matches you with cafés, libraries, and coworking spots in your area that fit.
              No more rolling the dice on a noisy bakery at 9am.
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
              <span className={styles.productStatus}>In development</span>
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
                <dd className={styles.statValue}>Active development</dd>
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
      </div>
    </section>
  );
}
