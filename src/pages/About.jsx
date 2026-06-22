import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import './About.css';

export default function About() {
  const { locale } = useLang();
  const a = locale.aboutPage;

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="hero-doc-wrap">
          <img className="hero-doc-img" src="/Images/School/Narine without bg..webp" alt="Dr. Narine Ayvazyan" fetchPriority="high" decoding="async" />
        </div>
        <div className="about-hero-right">
          <div className="about-hero-text">
            <p className="about-hero-subtitle">{a.hero.subtitle}</p>
            <h1 className="about-hero-title">{a.hero.title}</h1>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-items">
            <div className="hero-card-item">
              <div className="hero-card-icon">
                <img src="/Images/About us/icons/med.svg" alt="" />
              </div>
              <div className="hero-card-lines">
                {[...Array(6)].map((_, i) => <div key={i} className="hero-card-line" />)}
              </div>
              <Link to="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-book">{a.hero.bookBtn}</button>
              </Link>
            </div>
            <div className="hero-card-item">
              <div className="hero-card-icon">
                <img src="/Images/About us/icons/med2.svg" alt="" />
              </div>
              <div className="hero-card-lines">
                {[...Array(6)].map((_, i) => <div key={i} className="hero-card-line" />)}
              </div>
              <button className="btn-call">077 000 470</button>
            </div>
          </div>
        </div>
      </section>

      {/* MORE ABOUT DR NARINE */}
      <section className="about-section" style={{ paddingTop: 180 }}>
        <h2 className="section-title">{a.drNarine.title}</h2>
        <div className="dr-narine-grid">
          <div className="dr-photo-wrap">
            <img src="/Images/About us/IMG1.webp" alt="Dr. Narine Ayvazyan" loading="lazy" decoding="async" />
          </div>
          <div className="dr-text">
            <p>{a.drNarine.p1}</p>
            <p>{a.drNarine.p2}</p>
          </div>
        </div>
        <div className="dr-crown-grid">
          <div className="dr-crown-img">
            <img src="/Images/About us/IMG2.webp" alt="Dr. Narine Ayvazyan Award" loading="lazy" decoding="async" />
          </div>
          <div className="dr-crown-text">
            <p>{a.drNarine.p3}</p>
            <p>{a.drNarine.p4}</p>
            <p>{a.drNarine.p5}</p>
          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <section className="about-section" style={{ paddingTop: 0 }}>
        <h2 className="section-title">{a.team.title}</h2>

        <div className="team-member">
          <div>
            <div className="team-photo-wrap">
              <img src="/Images/About us/Narine.webp" alt="Narine Ayvazyan" loading="lazy" decoding="async" />
            </div>
            <div className="team-name">{a.team.narine.name}</div>
          </div>
          <div className="team-text-col">
            <p>{a.team.narine.p1}</p>
            <p>{a.team.narine.p2}</p>
            <p>{a.team.narine.p3}</p>
          </div>
        </div>

        <div className="team-member">
          <div>
            <div className="team-photo-wrap">
              <img src="/Images/About us/Anna.webp" alt="Anna Hovsepyan" loading="lazy" decoding="async" />
            </div>
            <div className="team-name">{a.team.anna.name}</div>
          </div>
          <div className="team-text-col">
            <p>{a.team.anna.p1}</p>
            <p>{a.team.anna.p2}</p>
            <p>{a.team.anna.p3}</p>
            <p>{a.team.anna.p4}</p>
          </div>
        </div>
      </section>

      {/* ABOUT N.AYVA */}
      <section className="about-section about-nayva-section">
        <h2 className="section-title">{a.nayva.title}</h2>
        <div className="about-nayva-grid">
          <div className="about-nayva-imgs">
            <div className="nayva-img-top">
              <img src="/Images/About us/Frame 14.webp" alt="N.Ayva Center" loading="lazy" decoding="async" />
            </div>
            <div className="nayva-img-bottom">
              <img src="/Images/About us/Frame 15.webp" alt="N.Ayva Team" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="about-nayva-text">
            <p>{a.nayva.p1}</p>
          </div>
        </div>
      </section>
    </>
  );
}
