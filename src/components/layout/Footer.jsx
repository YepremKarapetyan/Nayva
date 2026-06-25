import { Link } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { locale } = useLang();
  const f = locale.footer;

  return (
    <div className="footer-wrap">
      <footer className="footer">
        <div>
          <img src="/Images/logo/N Ayva Logo.svg" alt="N.Ayva" style={{ width: 140 }} />
          <div className="footer-logo-divider" />
          <p className="footer-desc">
            {f.desc}
            {f.descExtra && <span className="footer-desc-extra">{' ' + f.descExtra}</span>}
          </p>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">{f.schedule.title}</div>
          <p className="label">{f.schedule.daysLabel}</p>
          <p>{f.schedule.days}</p>
          <p className="label" style={{ marginTop: 12 }}>{f.schedule.hoursLabel}</p>
          <p>{f.schedule.hours}</p>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">{f.contact.title}</div>
          <p>077-000-470</p>
          <p style={{ marginTop: 10 }}>NarineAyvazyan<br />@gmail.com</p>
          <a href="https://maps.app.goo.gl/3B148yn7cZQEqaLw5" target="_blank" rel="noopener noreferrer" style={{ marginTop: 10, display: 'block' }}>
            Chaykovski 34,<br />Yerevan, Armenia
          </a>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">{f.links.title}</div>
          <div className="fast-links-wrap">
            <Link to="/about">{f.links.about}</Link>
            <Link to="/services">{f.links.services}</Link>
            <Link to="/school">{f.links.school}</Link>
            <Link to="/contact">{f.links.contact}</Link>
          </div>
        </div>

        <div className="footer-primescript">
          UI/UX Design by{' '}
          <a href="https://www.linkedin.com/in/zhanna-karapetyan-98b419334?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer">Zhanna Karapetyan</a>
          &nbsp;·&nbsp;
          Developed by{' '}
          <a href="https://primescript.am" target="_blank" rel="noopener noreferrer">PrimeScript</a>
        </div>
      </footer>
    </div>
  );
}
