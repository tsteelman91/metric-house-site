import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>§03 · Contact</p>
        <h2 className={styles.h2}>
          We&apos;d love to <em>hear from you</em>.
        </h2>
        <p className={styles.body}>
          Questions about Knowmad or Formulate, partnerships, press, or just want to say hi. The
          inbox is small and we read everything.
        </p>
        <a href="mailto:info@metric-house.com" className={styles.mailBox}>
          <span className={styles.mailInner}>
            <span className={styles.mailLabel}>WRITE TO US</span>
            <span className={styles.mailAddress}>info@metric-house.com</span>
          </span>
          <span className={styles.mailArrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
