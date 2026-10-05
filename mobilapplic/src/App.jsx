import { useState } from 'react';

const initialForm = { name: '', phone: '', email: '' };

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'saving', message: '' });

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'We could not save your details. Please try again.');
      }

      setForm(initialForm);
      setStatus({ type: 'success', message: 'Your contact details have been saved.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Could not reach the server. Check your connection and try again.',
      });
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="mobilapplic home">
          <span className="wordmark-icon" aria-hidden="true">m</span>
          <span>mobilapplic</span>
        </a>
        <span className="topbar-note"><span className="live-dot" /> CONTACT PROFILE</span>
      </header>

      <section className="content-grid" aria-labelledby="page-title">
        <div className="intro">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR DETAILS, TOGETHER</p>
          <h1 id="page-title">A good way<br />to <span>keep in touch.</span></h1>
          <p className="intro-copy">Add your contact details to get started. We will keep everything together in one place.</p>
          <div className="field-index" aria-hidden="true">
            <span><b>01</b> NAME</span>
            <span><b>02</b> PHONE</span>
            <span><b>03</b> EMAIL</span>
          </div>
          <div className="orbit-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <span className="orbit-core" />
            <span className="orbit-spark spark-one" />
            <span className="orbit-spark spark-two" />
          </div>
        </div>

        <div className="form-panel">
          <div className="form-heading">
            <div>
              <p className="form-kicker">NEW CONTACT</p>
              <h2>Your information</h2>
            </div>
            <span className="form-number">01 <i>/ 01</i></span>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="form-field" htmlFor="name">
              <span className="field-label">Full name</span>
              <input
                autoComplete="name"
                id="name"
                name="name"
                onChange={updateField}
                placeholder="e.g. Alex Morgan"
                required
                value={form.name}
              />
            </label>
            <label className="form-field" htmlFor="phone">
              <span className="field-label">Phone number</span>
              <input
                autoComplete="tel"
                id="phone"
                inputMode="tel"
                name="phone"
                onChange={updateField}
                placeholder="e.g. +1 555 010 2040"
                required
                type="tel"
                value={form.phone}
              />
            </label>
            <label className="form-field" htmlFor="email">
              <span className="field-label">Email address</span>
              <input
                autoComplete="email"
                id="email"
                name="email"
                onChange={updateField}
                placeholder="e.g. alex@example.com"
                required
                type="email"
                value={form.email}
              />
            </label>

            <button className="submit-button" disabled={status.type === 'saving'} type="submit">
              <span>{status.type === 'saving' ? 'Saving details...' : 'Save my details'}</span>
              <span className="button-mark" aria-hidden="true">&gt;</span>
            </button>
            <p className={`form-status ${status.type}`} aria-live="polite" role={status.type === 'error' ? 'alert' : 'status'}>
              {status.message}
            </p>
          </form>
          <div className="panel-foot"><span>mobilapplic</span><span>CONTACT DETAILS <b>/</b> 2026</span></div>
        </div>
      </section>
      <footer className="page-footer"><span>MADE TO KEEP THINGS SIMPLE</span><span>01 - CONTACT</span></footer>
    </main>
  );
}
