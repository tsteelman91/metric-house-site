import styles from './Products.module.css';

const PRODUCTS = [
  {
    name: 'Knowmad',
    line: 'Find a good place to work, nearby, today.',
    stage: 'Live in the Triangle',
    href: 'https://knowmad.work',
    host: 'knowmad.work',
  },
  {
    name: 'Formulate',
    line: 'Surveys that measure what you meant to measure.',
    stage: 'Live',
    href: 'https://formulatesurveys.com',
    host: 'formulatesurveys.com',
  },
  {
    name: 'Recruit',
    line: 'Run a university research subject pool in one place.',
    stage: 'Piloting',
    href: 'https://recruit.metric-house.com',
    host: 'recruit.metric-house.com',
  },
];

export function Products() {
  return (
    <section id="products" className={styles.products}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>§03 · Also from Metric House</p>
          <h2 className={styles.h2}>We also build software.</h2>
          <p className={styles.headerNote}>Each has its own site.</p>
        </div>
        <ul className={styles.list}>
          {PRODUCTS.map((p) => (
            <li key={p.name} className={styles.row}>
              <h3 className={styles.name}>{p.name}</h3>
              <p className={styles.line}>{p.line}</p>
              <span className={styles.stage}>{p.stage}</span>
              <a
                href={p.href}
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.host} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
