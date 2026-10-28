'use client';

import { useState, type FormEvent } from 'react';
import styles from './Contact.module.css';

// Formspree form that receives every contact request on the site.
export const FORMSPREE_ID = 'mkjjbern';
export const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;
export const CONTACT_EMAIL = 'metrichousellc@gmail.com';

export const TOPICS = [
  { value: 'My business and AI search', id: 'geo' },
  { value: 'One of the products', id: 'product' },
  { value: 'Something else', id: 'other' },
] as const;

type TopicId = (typeof TOPICS)[number]['id'];
type Field = 'name' | 'email' | 'biz' | 'town' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const MISSING: Record<Field, string> = {
  name: 'Please add your name.',
  email: 'Please add your email.',
  biz: 'Please add your business name.',
  town: 'Please add your town.',
  message: 'Please add a short message.',
};

function requiredFields(topic: TopicId): Field[] {
  if (topic === 'geo') return ['name', 'email', 'biz', 'town'];
  if (topic === 'other') return ['name', 'email', 'message'];
  return ['name', 'email'];
}

export function subjectFor(topic: TopicId, data: { name: string; biz: string; town: string }) {
  if (topic === 'geo') return `GEO call: ${data.biz} (${data.town})`;
  if (topic === 'product') return `Product question from ${data.name}`;
  return `Message from ${data.name}`;
}

function EmailLink() {
  return <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
}

export function ContactForm() {
  const [topic, setTopic] = useState<TopicId>('geo');
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const isGeo = topic === 'geo';

  function validate(form: HTMLFormElement) {
    const next: Partial<Record<Field, string>> = {};
    for (const name of requiredFields(topic)) {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (!input || !input.value.trim()) next[name] = MISSING[name];
    }
    const email = form.elements.namedItem('email') as HTMLInputElement;
    if (!next.email && !email.checkValidity()) next.email = 'That email does not look right.';
    setErrors(next);

    const order: Field[] = ['name', 'email', 'biz', 'town', 'message'];
    const firstBad = order.find((name) => next[name]);
    if (firstBad) (form.elements.namedItem(firstBad) as HTMLInputElement).focus();
    return !firstBad;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (status === 'error') setStatus('idle');
    if (!validate(form)) return;

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // honeypot filled: likely a bot, send nothing

    data.set(
      '_subject',
      subjectFor(topic, {
        name: String(data.get('name') ?? ''),
        biz: String(data.get('biz') ?? ''),
        town: String(data.get('town') ?? ''),
      })
    );

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  function clearError(name: Field) {
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function changeTopic(next: TopicId) {
    setTopic(next);
    setErrors({});
  }

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <p>Thanks. Tyler will reply within one business day.</p>
      </div>
    );
  }

  function textField(name: Field, label: string, placeholder: string, opts: { type?: string; autoComplete: string }) {
    return (
      <label className={styles.label}>
        {label}
        <input
          className={styles.input}
          name={name}
          type={opts.type ?? 'text'}
          placeholder={placeholder}
          autoComplete={opts.autoComplete}
          required
          aria-invalid={errors[name] ? true : undefined}
          aria-describedby={`contact-err-${name}`}
          onInput={() => clearError(name)}
        />
        <span className={styles.err} id={`contact-err-${name}`}>{errors[name] ?? ''}</span>
      </label>
    );
  }

  return (
    <form className={styles.form} method="post" action={FORMSPREE_URL} noValidate onSubmit={handleSubmit}>
      <fieldset className={styles.topics}>
        <legend className={styles.legend}>What&apos;s this about?</legend>
        <div className={styles.segments}>
          {TOPICS.map((t) => (
            <label key={t.id} className={`${styles.segment} ${topic === t.id ? styles.segmentOn : ''}`}>
              <input
                type="radio"
                name="topic"
                value={t.value}
                checked={topic === t.id}
                onChange={() => changeTopic(t.id)}
                className={styles.segmentInput}
              />
              {t.value}
            </label>
          ))}
        </div>
      </fieldset>

      {textField('name', 'Your name', 'First and last', { autoComplete: 'name' })}
      {textField('email', 'Email', 'you@example.com', { type: 'email', autoComplete: 'email' })}
      {isGeo && textField('biz', 'Business', 'Your business', { autoComplete: 'organization' })}
      {isGeo && textField('town', 'Town', 'e.g. Carrboro', { autoComplete: 'address-level2' })}

      <label className={`${styles.label} ${styles.full}`}>
        Message{topic === 'other' ? '' : ' (optional)'}
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          name="message"
          rows={3}
          placeholder="Anything you'd like us to know."
          required={topic === 'other'}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby="contact-err-message"
          onInput={() => clearError('message')}
        />
        <span className={styles.err} id="contact-err-message">{errors.message ?? ''}</span>
      </label>

      <div className={styles.hp} aria-hidden="true">
        <label>
          Leave this empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p className={styles.formMsg} role="alert">
          That didn&apos;t go through. You can write <EmailLink /> directly.
        </p>
      )}

      <div className={styles.send}>
        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : isGeo ? 'Set up a call →' : 'Send →'}
        </button>
        <span className={styles.alt}>
          Or write <EmailLink />
        </span>
      </div>
    </form>
  );
}
