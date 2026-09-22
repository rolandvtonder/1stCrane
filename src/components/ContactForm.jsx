import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { SITE } from '../data/site.js';

const SERVICES = [
  'Crane hire',
  'Rigging',
  'Transport & abnormal loads',
  'Machine moving & installation',
  'Crating, packing & warehousing',
  'Engineering & fabrication',
  'Excavator hire',
  'Buying a crane',
  'Something else',
];

const EMPTY = { name: '', company: '', phone: '', email: '', service: '', message: '', botcheck: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name.';
  if (!v.phone.trim()) e.phone = 'Enter a phone number so we can call you back.';
  else if (v.phone.replace(/\D/g, '').length < 9) e.phone = 'Check the phone number, it looks too short.';
  if (!v.email.trim()) e.email = 'Enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = 'Enter an email address like name@company.co.za.';
  if (!v.message.trim()) e.message = 'Tell us a little about the job.';
  return e;
}

const LABELS = { name: 'Name', phone: 'Phone', email: 'Email', message: 'About the job' };

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required ? (
          <span className="field__req" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="field__opt"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {error && (
        <p className="field__error" id={`${id}-error`}>
          <Icon name="close" size={14} /> {error}
        </p>
      )}
    </div>
  );
}

/**
 * Enquiry form. Posts to Web3Forms when SITE.form.accessKey is set; until
 * then it opens the visitor's email app with the enquiry written out, so no
 * message is ever lost. Errors show on blur, and a summary takes focus if a
 * submit fails.
 */
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | failed
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);
  const doneRef = useRef(null);

  // Arrivals carry what they came for: ?interest=… from the For Sale page's
  // "Enquire" buttons, ?job=… from the homepage quote box.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interest = params.get('interest');
    const job = params.get('job')?.trim();
    if (interest) {
      setValues((v) => ({ ...v, service: 'Buying a crane', message: `I’m interested in the ${interest}.` }));
    } else if (job) {
      setValues((v) => ({ ...v, message: job }));
    }
  }, []);

  useEffect(() => {
    if (showSummary) summaryRef.current?.focus();
  }, [showSummary]);

  useEffect(() => {
    if (status === 'sent' || status === 'mailto') doneRef.current?.focus();
  }, [status]);

  const set = (key) => (e) => {
    const next = { ...values, [key]: e.target.value };
    setValues(next);
    if (touched[key]) setErrors(validate(next));
  };
  const blur = (key) => () => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const shown = (key) => (touched[key] ? errors[key] : undefined);

  // summary links move focus into the field, not just scroll to it
  const focusField = (key) => (e) => {
    e.preventDefault();
    const el = document.getElementById(`f-${key}`);
    el?.scrollIntoView({ block: 'center' });
    el?.focus({ preventScroll: true });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.botcheck) return; // bots fill hidden fields
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, phone: true, email: true, message: true });
    if (Object.keys(errs).length) {
      setShowSummary(false);
      requestAnimationFrame(() => setShowSummary(true));
      return;
    }
    setShowSummary(false);

    const subject = `Website enquiry${values.service ? `: ${values.service}` : ''} from ${values.name}`;
    const body = [
      `Name: ${values.name}`,
      values.company && `Company: ${values.company}`,
      `Phone: ${values.phone}`,
      `Email: ${values.email}`,
      values.service && `Service: ${values.service}`,
      '',
      values.message,
    ]
      .filter((l) => l !== false && l !== undefined && l !== '')
      .join('\n');

    if (!SITE.form.accessKey) {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(SITE.form.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.form.accessKey,
          subject,
          from_name: '1stcrane.co.za',
          replyto: values.email,
          name: values.name,
          company: values.company,
          phone: values.phone,
          email: values.email,
          service: values.service,
          message: values.message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || 'Send failed');
      setStatus('sent');
      setValues(EMPTY);
      setTouched({});
    } catch {
      setStatus('failed');
    }
  };

  if (status === 'sent' || status === 'mailto') {
    return (
      <div className="form-done" ref={doneRef} tabIndex={-1} role="status">
        <Icon name="check" size={32} />
        {status === 'sent' ? (
          <>
            <h3>Thanks, your enquiry is in.</h3>
            <p>We’ll be in touch shortly. For anything urgent, call {SITE.phone.display}; cranes are available 24/7.</p>
          </>
        ) : (
          <>
            <h3>Your email app should now be open.</h3>
            <p>
              Your enquiry is written out and ready. Just press send. If nothing opened, email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call <a href={SITE.phone.href}>{SITE.phone.display}</a>.
            </p>
          </>
        )}
        <button className="link-btn" onClick={() => setStatus('idle')}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorKeys = Object.keys(errors).filter((k) => touched[k]);

  return (
    <form className="form" noValidate onSubmit={onSubmit}>
      {showSummary && errorKeys.length > 0 && (
        <div className="form-summary" role="alert" tabIndex={-1} ref={summaryRef}>
          <h3>Please check {errorKeys.length === 1 ? 'one thing' : `${errorKeys.length} things`}:</h3>
          <ul>
            {errorKeys.map((k) => (
              <li key={k}>
                <a href={`#f-${k}`} onClick={focusField(k)}>
                  {LABELS[k]}: {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="form__row">
        <Field id="f-name" label="Name" required error={shown('name')}>
          <input
            id="f-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set('name')}
            onBlur={blur('name')}
            aria-invalid={!!shown('name')}
            aria-describedby={shown('name') ? 'f-name-error' : undefined}
            required
          />
        </Field>
        <Field id="f-company" label="Company">
          <input
            id="f-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={set('company')}
          />
        </Field>
      </div>

      <div className="form__row">
        <Field id="f-phone" label="Phone" required error={shown('phone')}>
          <input
            id="f-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set('phone')}
            onBlur={blur('phone')}
            aria-invalid={!!shown('phone')}
            aria-describedby={shown('phone') ? 'f-phone-error' : undefined}
            required
          />
        </Field>
        <Field id="f-email" label="Email" required error={shown('email')}>
          <input
            id="f-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set('email')}
            onBlur={blur('email')}
            aria-invalid={!!shown('email')}
            aria-describedby={shown('email') ? 'f-email-error' : undefined}
            required
          />
        </Field>
      </div>

      <Field id="f-service" label="What do you need?">
        <select id="f-service" name="service" value={values.service} onChange={set('service')}>
          <option value="">Choose a service</option>
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </Field>

      <Field
        id="f-message"
        label="About the job"
        required
        error={shown('message')}
        hint="What you’re lifting, its size and weight, the dates and the site address all help us quote."
      >
        <textarea
          id="f-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={set('message')}
          onBlur={blur('message')}
          aria-invalid={!!shown('message')}
          aria-describedby={shown('message') ? 'f-message-error' : 'f-message-hint'}
          required
        />
      </Field>

      <input
        className="hp"
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={values.botcheck}
        onChange={set('botcheck')}
        aria-hidden="true"
      />

      {status === 'failed' && (
        <p className="form-fail" role="alert">
          That didn’t send. Please try again, or call {SITE.phone.display} or email {SITE.email}.
        </p>
      )}

      <div className="form__foot">
        <button className="btn btn--dark" type="submit" disabled={status === 'sending'}>
          <span className="btn__label">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</span>
          <span className="btn__icon" aria-hidden="true">
            <Icon name="arrow" size={18} />
          </span>
        </button>
        <p className="form__note">
          <span aria-hidden="true">*</span> Required. Or call{' '}
          <a href={SITE.phone.href}>{SITE.phone.display}</a>, available 24/7.
        </p>
      </div>
    </form>
  );
}
