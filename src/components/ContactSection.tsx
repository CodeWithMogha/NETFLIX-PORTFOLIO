import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactSection.css';

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

const ContactSection: React.FC = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setStatus('sending');
        try {
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
            setStatus('sent');
            formRef.current.reset();
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="contact-section">
            {/* Red accent line at top */}
            <div className="contact-divider" />

            <div className="contact-inner">
                {/* ── Left: heading ── */}
                <div className="contact-left">
                    <span className="contact-eyebrow">Let's talk</span>
                    <h2 className="contact-heading">Contact<br />Me.</h2>
                    <p className="contact-sub">
                        Got an opportunity, a project, or just want to say hi?
                        Drop a message — I read every one.
                    </p>
                </div>

                {/* ── Right: form ── */}
                <div className="contact-right">
                    <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                        <div className="contact-row">
                            <div className="contact-field">
                                <label htmlFor="contact-name">Your Name</label>
                                <input
                                    id="contact-name"
                                    name="from_name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="contact-field">
                                <label htmlFor="contact-email">Your Email</label>
                                <input
                                    id="contact-email"
                                    name="reply_to"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-field">
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                rows={6}
                                placeholder="Hey Amitesh, I'd love to connect about..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`contact-btn ${status}`}
                            disabled={status === 'sending' || status === 'sent'}
                        >
                            {status === 'idle' && 'Send Message ✉'}
                            {status === 'sending' && 'Sending…'}
                            {status === 'sent' && '✓ Message Sent!'}
                            {status === 'error' && 'Error — Try Again'}
                        </button>

                        {status === 'error' && (
                            <p className="contact-error-msg">
                                Something went wrong. Please check your EmailJS keys in the <code>.env</code> file.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
