'use client';

import { useState, type FormEvent } from 'react';
import styles from './Geo.module.css';

// Formspree form that receives consultation requests. If emptied, the form
// falls back to opening a prefilled email instead.
export const FORMSPREE_ID = 'mkjjbern';
export const GEO_EMAIL = 'metrichousellc@gmail.com';

type Field = 'name' | 'biz' | 'town' | 'email';
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const FIELDS: { name: Field; label: string; placeholder: string; type?: string; autoComplete: string }[] = [
  { name: 'name', label: 'Your name', placeholder: 'First and last', autoComplete: 'name' },
  { name: 'biz', label: 'Business', placeholder: 'Your business', autoComplete: 'organization' },
  { name: 'town', label: 'Town', placeholder: 'e.g. Carrboro', autoComplete: 'address-level2' },
  { name: 'email', label: 'Email', placeholder: 'you@yourbusiness.com', type: 'email', autoComplete: 'email' },
];

const MISSING: Record<Field, string> = {
  name: 'Please add your name.',
  biz: 'Please add your business name.',
  town: 'Please add your town.',
  email: 'Please add your email.',
};

function EmailLink() {
  return <a href={`mailto:${GEO_EMAIL}`}>{GEO_EMAIL}</a>;
}

export function GeoForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  function validate(form: HTMLFormElement) {
    const next: Partial<Record<Field, string>> = {};
    for (const { name } of FIELDS) {
      const input = form.elements.namedItem(name) as HTMLInputElement;
      if (!input.value.trim()) next[name] = MISSING[name];
      else if (name === 'email' && !input.checkValidity()) next[name] = 'That email does not look right.';
    }
    setErrors(next);
    const firstBad = FIELDS.find(({ name }) => next[name]);
    if (firstBad) (form.elements.namedItem(firstBad.name) as HTMLInputElement).focus();
    return !firstBad;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (status === 'error') setStatus('idle');
    if (!validate(form)) return;

    const data = new FormData(form);
    if (data.get('_gotcha')) return; // honeypot filled: likely a bot, send nothing

    if (!FORMSPREE_ID) {
      const subject = `GEO call: ${data.get('biz')} (${data.get('town')})`;
      const body = `Name: ${data.get('name')}\nBusiness: ${data.get('biz')}\nTown: ${data.get('town')}\nEmail: ${data.get('email')}`;
      window.location.href = `mailto:${GEO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
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

  if (status === 'sent') {
    return (
      <div className={styles.done} role="status">
        <p>Thanks. Tyler will reply within one business day.</p>
      </div>
    );
  }

  if (status === 'mailto') {
    return (
      <div className={`${styles.done} ${styles.doneSmall}`} role="status">
        <p>
          Your email app should open with this filled in. If it didn&apos;t, write <EmailLink />.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      method="post"
      action={`https://formspree.io/f/${FORMSPREE_ID}`}
      noValidate
      onSubmit={handleSubmit}
    >
      {FIELDS.map(({ name, label, placeholder, type, autoComplete }) => (
        <label key={name} className={styles.label}>
          {label}
          <input
            className={styles.input}
            name={name}
            type={type ?? 'text'}
            placeholder={placeholder}
            autoComplete={autoComplete}
            required
            aria-invalid={errors[name] ? true : undefined}
            aria-describedby={`geo-err-${name}`}
            onInput={() => clearError(name)}
          />
          <span className={styles.err} id={`geo-err-${name}`}>
            {errors[name] ?? ''}
          </span>
        </label>
      ))}
      <div className={styles.hp} aria-hidden="true">
        <label>
          Leave this empty
          <input name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {status === 'error' && (
        <p className={styles.formMsg} role="alert">
          That didn&apos;t go through. You can email <EmailLink /> directly.
        </p>
      )}
      <div className={styles.send}>
        <button type="submit" className={styles.submit} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Set up a call →'}
        </button>
        <span className={styles.alt}>
          Or write <EmailLink />
        </span>
      </div>
    </form>
  );
}
