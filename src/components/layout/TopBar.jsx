import { useLang } from '../../context/LanguageContext';
import './TopBar.css';

export default function TopBar() {
  const { lang, setLang, locale } = useLang();

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <a className="top-bar-item top-bar-address" href="https://maps.app.goo.gl/3B148yn7cZQEqaLw5" target="_blank" rel="noopener noreferrer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="top-bar-address-text">
            <span>{locale.topbar.addressLine1}</span>
            <span>{locale.topbar.addressLine2}</span>
          </span>
        </a>
        <div className="top-bar-divider"/>
        <a className="top-bar-item" href="tel:+37477000470">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span>077-000-470</span>
        </a>
        <div className="top-bar-divider"/>
        <a className="top-bar-item" href="tel:+37495000886">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
          </svg>
          <span>095-000-886</span>
        </a>
      </div>
      <div className="lang-switcher">
        <button className={`lang-btn${lang === 'en' ? ' active' : ''}`} onClick={() => setLang('en')}>EN</button>
        <span className="lang-sep">/</span>
        <button className={`lang-btn${lang === 'am' ? ' active' : ''}`} onClick={() => setLang('am')}>AM</button>
        <span className="lang-sep">/</span>
        <button className={`lang-btn${lang === 'ru' ? ' active' : ''}`} onClick={() => setLang('ru')}>RU</button>
      </div>
    </div>
  );
}
