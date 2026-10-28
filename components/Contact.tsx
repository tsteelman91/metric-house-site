import { ContactForm } from './ContactForm';
import styles from './Contact.module.css';

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>§04 · Contact</p>
          <h2 className={styles.h2}>
            Start with <em>a conversation</em>.
          </h2>
          <p className={styles.body}>
            Tell us a little about your business, or whatever you&apos;re writing about. We read
            everything and reply ourselves.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
