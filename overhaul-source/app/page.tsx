'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowRight, Building2, Cable, Check, ClipboardCheck, Headphones, MapPin, Network, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';

declare global { interface Window { gtag?: (...args: unknown[]) => void } }

const services = [
  { icon: Cable, title: 'Structured cabling', copy: 'Cat5e and Cat6 runs, terminations, testing, tracing, labeling, keystones, and patch panels.' },
  { icon: Wrench, title: 'On-site IT troubleshooting', copy: 'Hands-on diagnosis for network equipment, workstations, access points, printers, and connected devices.' },
  { icon: Network, title: 'Commercial equipment', copy: 'POS peripherals, cameras, industrial printers, displays, and the hardware your operation depends on.' },
  { icon: ClipboardCheck, title: 'Site surveys & documentation', copy: 'Useful photos, port details, model and serial capture, condition notes, and a clear handoff.' },
];

const photos = [
  ['on-site', 'On-site support', 'Physical troubleshooting'],
  ['cabling', 'Network cabling', 'Existing infrastructure'],
  ['fiber', 'Low voltage', 'Fiber infrastructure'],
] as const;

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stored: Record<string, string> = {};
    ['gclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach((key) => {
      const value = params.get(key) || sessionStorage.getItem(`lead_${key}`) || '';
      if (value) { stored[key] = value; sessionStorage.setItem(`lead_${key}`, value); }
    });
    stored.landing_page = window.location.href;
    stored.referrer = document.referrer;
    setAttribution(stored);
  }, []);

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = new FormData(form);
    Object.entries(attribution).forEach(([key, value]) => data.set(key, value));
    try {
      const response = await fetch('https://formspree.io/f/xbdzeonw', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Request failed');
      window.gtag?.('event', 'conversion', { send_to: 'AW-18358813765/WWzoCIShzt8cEMWIlbJE' });
      form.reset();
      setStatus('sent');
    } catch { setStatus('error'); }
  }

  function trackCall() {
    window.gtag?.('event', 'phone_call_click', { phone_number: '+16205913188', event_category: 'lead' });
  }

  return <main>
    <div className="topline"><div className="wrap topline-inner"><span><span className="pulse" /> Service requests accepted 24/7</span><span className="topline-areas">Kansas City · Topeka · Manhattan · Emporia · Wichita</span></div></div>
    <header className="site-header"><div className="wrap header-inner">
      <a className="brand" href="#top" aria-label="The IT Guy home"><img src="/translogo.png" alt="" width="52" height="52" /><span><strong>The IT Guy</strong><small>Commercial IT field services</small></span></a>
      <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#field-work">Field work</a><a href="#coverage">Coverage</a></nav>
      <a className="button button-small" href="tel:+16205913188" onClick={trackCall}><PhoneCall size={16} /> (620) 591-3188</a>
    </div></header>

    <section className="hero" id="top"><div className="wrap hero-grid">
      <div className="hero-copy"><p className="eyebrow"><span /> On-site IT + low voltage</p><h1>When the problem is on site, send the IT guy.</h1><p className="hero-lead">Commercial IT support and structured cabling across Kansas. One reliable local technician for the physical work your remote team cannot do from a ticket.</p><div className="hero-actions"><a className="button" href="tel:+16205913188" onClick={trackCall}><PhoneCall size={18} /> Call (620) 591-3188</a><a className="text-link" href="#request-service">Or request service online</a></div><div className="hero-trust"><span><ShieldCheck size={18} /> Commercial focused</span><span><MapPin size={18} /> Kansas coverage</span><span><ClipboardCheck size={18} /> Clear documentation</span></div></div>
      <aside className="lead-card" aria-label="Request a callback"><div className="lead-card-heading"><span className="icon-box"><PhoneCall size={22} /></span><div><p>Need hands on site?</p><h2>Start with a quick callback.</h2></div></div><p className="lead-card-copy">Send the basics. We’ll confirm coverage, timing, and the right next step.</p>
        <form onSubmit={submitRequest}><label>Name <input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Business phone <input name="phone" type="tel" autoComplete="tel" required placeholder="Best number to call" /></label><label>Site city or ZIP <input name="site_location" autoComplete="postal-code" required placeholder="Where is the work?" /></label><input className="bot-field" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" /><input type="hidden" name="subject" value="New callback request from sendtheitguy.com" /><button className="button form-button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request my callback'} <ArrowRight size={18} /></button><Status status={status} /></form>
        <p className="microcopy"><Check size={14} /> Prefer to call? <a href="tel:+16205913188" onClick={trackCall}>(620) 591-3188</a></p>
      </aside>
    </div></section>

    <section className="proof-bar"><div className="wrap proof-grid"><div><Building2 /><p><strong>Built for businesses</strong><span>Offices, facilities, retail, and multi-site teams</span></p></div><div><Headphones /><p><strong>Remote-team ready</strong><span>Coordinate with your MSP, NOC, or vendor</span></p></div><div><ClipboardCheck /><p><strong>Useful closeout</strong><span>Photos, ports, serials, and findings</span></p></div></div></section>

    <section className="section" id="services"><div className="wrap"><div className="section-heading"><div><p className="eyebrow dark"><span /> Practical field support</p><h2>The physical IT work that keeps business moving.</h2></div><p>From a single failed connection to a multi-site rollout, get one accountable on-site resource who can inspect, coordinate, complete, and document the work.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, copy }, index) => <article className="service-card" key={title}><div className="service-top"><span className="icon-box pale"><Icon size={24} /></span><small>0{index + 1}</small></div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>

    <section className="section field-section" id="field-work"><div className="wrap"><div className="section-heading light"><div><p className="eyebrow"><span /> From the field</p><h2>Real equipment. Real environments.</h2></div><p>Selected examples of infrastructure and equipment supported on site.</p></div><div className="photo-grid">{photos.map(([photo, tag, title]) => <figure className="project-card" data-photo={photo} key={photo}><div className="project-card__image" role="img" aria-label={`${title} commercial field work`} /><figcaption><span>{tag}</span><strong>{title}</strong></figcaption></figure>)}</div></div></section>

    <section className="section coverage-section" id="coverage"><div className="wrap coverage-grid"><div><p className="eyebrow dark"><span /> Service area</p><h2>Local hands across Kansas.</h2><p>Serving businesses in and around Kansas City, Topeka, Manhattan, Junction City, Emporia, and Wichita. Send the site ZIP and scope—we’ll confirm availability.</p><a className="button" href="#request-service">Check availability <ArrowRight size={18} /></a></div><div className="steps"><article><span>1</span><div><strong>Tell us what is happening</strong><p>Share the site, symptoms, timing, and contact.</p></div></article><article><span>2</span><div><strong>Confirm the right approach</strong><p>We align on coverage, access, and scope.</p></div></article><article><span>3</span><div><strong>Complete and document</strong><p>You get the work performed and useful findings.</p></div></article></div></div></section>

    <section className="section request-section" id="request-service"><div className="wrap request-grid"><div><p className="eyebrow"><span /> Request service</p><h2>Get the right person on site.</h2><p>Tell us what you know. We’ll review the location, scope, and timing and respond with a clear next step.</p></div><form className="full-form" onSubmit={submitRequest}><div className="form-row"><label>Your name<input name="name" autoComplete="name" required /></label><label>Company<input name="company" autoComplete="organization" required /></label></div><div className="form-row"><label>Business email<input name="email" type="email" autoComplete="email" required /></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required /></label></div><div className="form-row"><label>Site city or ZIP<input name="site_location" autoComplete="postal-code" required /></label><label>Service needed<select name="service_type" required defaultValue=""><option value="" disabled>Select one</option><option>Structured cabling or data line</option><option>On-site IT troubleshooting</option><option>Commercial equipment or peripherals</option><option>Site survey or documentation</option><option>Multi-site or ongoing support</option></select></label></div><label>What is happening on site?<textarea name="message" rows={4} required placeholder="Scope, symptoms, timing, access details, or ticket number" /></label><input className="bot-field" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" /><input type="hidden" name="subject" value="New qualified service request from sendtheitguy.com" /><button className="button" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send service request'} <ArrowRight size={18} /></button><Status status={status} /></form></div></section>

    <footer><div className="wrap footer-inner"><a className="brand" href="#top"><img src="/translogo.png" alt="" width="48" height="48" /><span><strong>The IT Guy</strong><small>Commercial IT field services</small></span></a><a href="tel:+16205913188" onClick={trackCall}>(620) 591-3188</a><p>© 2026 The IT Guy, LLC</p><a href="/privacy">Privacy</a></div></footer>
    <div className="mobile-cta"><a className="button button-call" href="tel:+16205913188" onClick={trackCall}><PhoneCall size={18} /> Call now</a><a className="button button-request" href="#request-service">Request service</a></div>
  </main>;
}

function Status({ status }: { status: 'idle' | 'sending' | 'sent' | 'error' }) {
  return <p className={`form-status ${status === 'error' ? 'error' : ''}`} role="status" aria-live="polite">{status === 'sent' && 'Thanks — your request was sent. We’ll be in touch.'}{status === 'error' && 'That did not go through. Please try again.'}</p>;
}
