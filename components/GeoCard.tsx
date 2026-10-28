'use client';

import { useEffect, useState } from 'react';
import styles from './GeoCard.module.css';

const PROMPTS = [
  { question: 'best coffee shop to work from in Carrboro?', intro: 'Here are a few spots locals recommend:' },
  { question: 'plumber in Chapel Hill who can come today?', intro: 'These are highly rated and responsive:' },
  { question: 'family dentist in Durham taking new patients?', intro: 'A few practices that come up often:' },
  { question: 'where should I buy flowers in Raleigh?', intro: 'Shops people mention most:' },
];

const TOTAL_ASKS = 20;

function Dots({ named, fill }: { named: number; fill: number }) {
  return (
    <span className={styles.dots}>
      {Array.from({ length: TOTAL_ASKS }, (_, k) => (
        <span key={k} className={k < Math.min(named, fill) ? styles.dotFilled : styles.dot} />
      ))}
    </span>
  );
}

export function GeoCard() {
  const [typed, setTyped] = useState(PROMPTS[0].question);
  const [introIndex, setIntroIndex] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [swapping, setSwapping] = useState(false);
  // How far the dot strips have filled, 0 to 20. Starts full so the first paint is complete.
  const [fill, setFill] = useState(TOTAL_ASKS);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let cancelled = false;
    const timers: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    (async () => {
      let i = 0;
      while (!cancelled) {
        await wait(4200);
        if (cancelled) return;
        i = (i + 1) % PROMPTS.length;
        const { question } = PROMPTS[i];

        // Hide the old intro fully so it never sits under the new question
        setIntroVisible(false);
        const step = Math.min(55, 1200 / question.length); // typing capped at about 1.2s
        for (let c = 1; c <= question.length; c++) {
          setTyped(question.slice(0, c));
          await wait(step);
          if (cancelled) return;
        }

        setSwapping(true);
        setFill(0);
        await wait(200);
        if (cancelled) return;
        setIntroIndex(i);
        setIntroVisible(true);
        setSwapping(false);

        for (let s = 1; s <= TOTAL_ASKS; s++) {
          await wait(45);
          if (cancelled) return;
          setFill(s);
        }
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div>
      <div
        className={`${styles.card} ${swapping ? styles.swap : ''}`}
        role="figure"
        aria-live="off"
        aria-label="Illustration: an example AI answer to a local question. Over 20 asks, one nearby business is named 17 times, another 11 times, and yours 3 times. Numbers are examples."
      >
        <div aria-hidden="true">
          <div className={styles.bar}>
            <span /><span /><span />
            <b>Example · AI answer</b>
          </div>
          <div className={styles.q}>
            <small>Ask</small>
            <p>
              <span>{typed}</span>
              <span className={styles.caret} />
            </p>
          </div>
          <div className={styles.a}>
            <p className={`${styles.intro} ${introVisible ? '' : styles.introHidden}`}>
              {PROMPTS[introIndex].intro}
            </p>
            <ol className={styles.rows}>
              <li>
                <i>01</i>
                <div className={styles.pick}>
                  <b>A nearby business</b>
                  <small>mentioned in: reviews, Google listing</small>
                  <div className={styles.meter}>
                    <Dots named={17} fill={fill} />
                    <small>named 17 of 20 asks</small>
                  </div>
                </div>
              </li>
              <li>
                <i>02</i>
                <div className={styles.pick}>
                  <b>Another nearby business</b>
                  <small>mentioned in: local news, their website</small>
                  <div className={styles.meter}>
                    <Dots named={11} fill={fill} />
                    <small>named 11 of 20 asks</small>
                  </div>
                </div>
              </li>
              <li>
                <i>03</i>
                <div className={styles.you}>
                  <div className={styles.youTop}>Yours?</div>
                  <div className={`${styles.meter} ${styles.meterWarm}`}>
                    <Dots named={3} fill={fill} />
                    <small>named 3 of 20 asks</small>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <p className={styles.cardNote}>Illustration. Numbers are examples, not a real business.</p>
    </div>
  );
}
