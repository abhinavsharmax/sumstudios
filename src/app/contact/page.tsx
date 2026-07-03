'use client';

import { useState } from 'react';
import DivisionLine from '@/components/ui/DivisionLine';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { RainbowButton } from '@/components/ui/RainbowButton';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <div className="page-hero container">
        <ScrollReveal>
          <p className="label page-hero__eyebrow">Reach Out</p>
          <h1 className="display-hero page-hero__title">Contact</h1>
        </ScrollReveal>
      </div>

      <div className="container contact-layout">
        {/* Left — info */}
        <ScrollReveal>
          <div>
            <p className="body-lg text-muted" style={{ maxWidth: '38ch', marginBottom: 'var(--space-lg)' }}>
              We welcome enquiries for new projects, press, collaborations, and objects. We aim to respond within two working days.
            </p>

            {[
              {
                label: 'Studio',
                lines: ['Studio 4B, Ballard Estate', 'Mumbai 400 001, India'],
              },
              {
                label: 'Email',
                lines: ['hello@sumstudio.in', 'press@sumstudio.in'],
              },
              {
                label: 'Phone',
                lines: ['+91 22 4000 0000'],
              },
              {
                label: 'Hours',
                lines: ['Monday – Friday', '09:00 – 18:00 IST'],
              },
            ].map(item => (
              <div key={item.label} style={{ borderBottom: '1px solid var(--border)', padding: '1.5rem 0', display: 'grid', gridTemplateColumns: '100px 1fr', gap: '1rem' }}>
                <span className="label">{item.label}</span>
                <div>
                  {item.lines.map((line, i) => (
                    <p key={i} className="body-base">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 'var(--space-lg)' }}>
              <p className="label mb-sm">Follow</p>
              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                {['Instagram', 'LinkedIn', 'Pinterest'].map(platform => (
                  <a key={platform} href="#" className="section__link">{platform}</a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right — form */}
        <ScrollReveal delay={1}>
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', paddingTop: 'var(--space-xl)' }}>
              <p className="display-md" style={{ marginBottom: 'var(--space-sm)' }}>Thank you.</p>
              <p className="body-lg text-muted">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <p className="display-sm" style={{ marginBottom: 'var(--space-md)' }}>Tell us about your project</p>
              </div>

              <div className="form-field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-subject">Enquiry Type</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--fg)', cursor: 'pointer' }}
                >
                  <option value="">Select a topic</option>
                  <option value="new-project">New Project</option>
                  <option value="object">Object Enquiry</option>
                  <option value="press">Press</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Describe your project, brief, or question..."
                  required
                />
              </div>

              <RainbowButton type="submit" style={{ width: '100%', marginTop: '1rem' }}>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </RainbowButton>
            </form>
          )}
        </ScrollReveal>
      </div>

      <DivisionLine className="container" style={{ marginTop: 'var(--space-xl)' }} />
    </>
  );
}
