import './Contact.css';
import { useLang } from '../context/LanguageContext';

export default function Contact() {
  const { locale } = useLang();
  const s = locale.contactPage;
  const c = s.infoCards;
  const d = s.contactDetails;

  return (
    <>
      {/* HERO BANNER */}
      <div className="contact-hero-banner">
        <div className="contact-hero-bg" />
        <div className="contact-hero-overlay" />
        <h1>{s.hero.title}</h1>
      </div>

      {/* PHOTO + INFO */}
      <section className="contact-main-section">
        <div className="contact-photo-wrap">
          <div className="contact-photo-bg" style={{ backgroundImage: "url('/Images/contact/IMG_5884 1.webp')" }} />
          <div className="contact-photo-overlay">
            <div className="working-hours-icon">
              <img src="/Images/contact/2bd0d3f5c435903fa46986e335e6bc7fe3353156.webp" alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
            </div>
            <div className="working-hours-text">
              <div className="working-hours-title">{s.workingHours.title}</div>
              <div className="working-hours-val">{s.workingHours.days}</div>
              <div className="working-hours-val">{s.workingHours.hours}</div>
            </div>
          </div>
        </div>

        <div className="info-text-cards">
          <div className="info-text-card">
            <p>
              {c.consultation.pre}
              <strong style={{ color: '#007f7e' }}>{c.consultation.price}</strong>
              {c.consultation.mid}
              <strong style={{ color: '#007f7e' }}>{c.consultation.free}</strong>
            </p>
          </div>
          <div className="info-text-card">
            <p>
              {c.priceChange.pre}
              <strong style={{ color: '#007f7e' }}>{c.priceChange.range}</strong>
              {c.priceChange.suf}
            </p>
          </div>
          <div className="info-text-card">
            <p style={{ fontWeight: 600, letterSpacing: '0.03em' }}>{c.installment}</p>
          </div>
          <div className="info-text-card">
            <p>{c.payLater}</p>
          </div>
          <div className="info-text-card">
            <p>
              {c.paymentMethods.pre}
              <strong>Ameria Bank (MyPay)</strong>, <strong>ID Bank (Rocket Line)</strong> and <strong>Smart Credit</strong>
            </p>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <div className="contact-info-cards">
        <div className="contact-info-card">
          <div className="info-card-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div>
            <div className="info-card-label">{d.phone.label}</div>
            <div className="info-card-value">+374 77 000 470</div>
          </div>
        </div>
        <div className="contact-info-card">
          <div className="info-card-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div>
            <div className="info-card-label">{d.address.label}</div>
            <a href="https://maps.app.goo.gl/3B148yn7cZQEqaLw5" target="_blank" rel="noopener noreferrer" className="info-card-value" style={{ textDecoration: 'none' }}>
              {d.address.line1}<br />{d.address.line2}
            </a>
          </div>
        </div>
        <div className="contact-info-card">
          <div className="info-card-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <div>
            <div className="info-card-label">{d.email.label}</div>
            <div className="info-card-value">N.Ayvaclinic@gmail.com</div>
          </div>
        </div>
      </div>

      {/* MAP */}
      <section className="contact-map-section">
        <h2 className="contact-map-title">{s.map.title}</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps?q=40.174741,44.517581&t=k&output=embed"
            width="100%" height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="N.Ayva Location"
          />
        </div>
      </section>
    </>
  );
}
