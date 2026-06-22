import { Link } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect, memo } from 'react';
import { useLang } from '../context/LanguageContext';
import { VIDEOS } from '../config/videos';
import { db } from '../firebase';
import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore';
import './Home.css';

const PAIR_COUNT = 41;
const BEFORE_AFTER_PAIRS = Array.from({ length: PAIR_COUNT }, (_, i) => ({
  before: `/Images/Home page/before after done/before${i + 1}.webp`,
  after: `/Images/Home page/before after done/after${i + 1}.webp`,
}));

const SERVICE_IMAGES = [
  { img: '/Images/all services images:icons/դեմքի մաքրում/դեմքի մաքրում և խնամք.webp', icon: '/Images/all services images:icons/դեմքի մաքրում/դեմքի մաքրում icon.svg', route: '/services/all/face-cleaning' },
  { img: '/Images/all services images:icons/ապարատային կոսմ./ապարատային կոսմետոլոգիա.webp', icon: '/Images/all services images:icons/ապարատային կոսմ./ապարատային icon.svg', route: '/services/all/aparatayin' },
  { img: '/Images/all services images:icons/ներարկումներ/ներարկումներ.webp', icon: '/Images/all services images:icons/ներարկումներ/ներարկումներ icon.svg', route: '/services/all/nerarkoumner' },
];

const DEFAULT_REVIEWS = [
  {
    name: 'Sarah M.',
    stars: 4,
    title: 'It was a very good experience',
    text: 'The staff was very professional and kind. I felt very comfortable during the entire procedure. Will definitely come back!',
  },
  {
    name: 'Anna K.',
    stars: 5,
    title: 'Absolutely amazing results!',
    text: 'I am so happy with my results. The team at N.AYVA is incredibly skilled and the clinic is beautifully maintained.',
    featured: true,
  },
  {
    name: 'Maria L.',
    stars: 5,
    title: 'Highly recommend',
    text: 'Professional service from start to finish. Dr. Narine is an expert in her field. My skin has never looked better.',
  },
];



const CARD_GAP = 14;

function getCardsVisible() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 4;
}

const ResultsCard = memo(function ResultsCard({ pair, labelBefore, labelAfter }) {
  const [after, setAfter] = useState(false);
  return (
    <div className={`rs-card${after ? ' rs-card--after' : ''}`} onClick={() => setAfter(a => !a)}>
      <div className="rs-before">
        <img src={pair.before} alt="Before" loading="lazy" decoding="async" draggable={false} />
      </div>
      <div className="rs-after">
        <img src={pair.after} alt="After" loading="lazy" decoding="async" draggable={false} />
      </div>
      <div className="rs-line" />
      <span className="rs-badge rs-badge--b">{labelBefore}</span>
      <span className="rs-badge rs-badge--a">{labelAfter}</span>
    </div>
  );
});

const ResultsCarousel = memo(function ResultsCarousel({ pairs, labelBefore, labelAfter }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(getCardsVisible);
  const maxIndex = pairs.length - cardsVisible;

  useEffect(() => {
    const update = () => setCardsVisible(getCardsVisible());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    setIndex(i => Math.min(i, Math.max(0, pairs.length - cardsVisible)));
  }, [cardsVisible, pairs.length]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.rs-card');
    if (!card) return;
    track.style.transform = `translateX(-${index * (card.offsetWidth + CARD_GAP)}px)`;
  }, [index, cardsVisible]);

  const prev = useCallback(() => setIndex(i => {
    const p = i - cardsVisible;
    return p < 0 ? maxIndex : p;
  }), [maxIndex, cardsVisible]);
  const next = useCallback(() => setIndex(i => {
    const n = i + cardsVisible;
    return n > maxIndex ? 0 : n;
  }), [maxIndex, cardsVisible]);

  return (
    <div className="rs-wrap">
      <button className="rs-btn" onClick={prev} aria-label="Previous">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div className="rs-viewport">
        <div className="rs-track" ref={trackRef}>
          {pairs.map((pair, i) => (
            <ResultsCard key={i} pair={pair} labelBefore={labelBefore} labelAfter={labelAfter} />
          ))}
        </div>
      </div>
      <button className="rs-btn" onClick={next} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
});

const emptyForm = { name: '', stars: 5, title: '', text: '' };

export default function Home() {
  const { locale } = useLang();
  const h = locale.home;

  const serviceCards = SERVICE_IMAGES.map((meta, i) => ({
    ...meta,
    name: h.services.cards[i].name,
    items: h.services.cards[i].items,
  }));

  const [userReviews, setUserReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [hoverStar, setHoverStar] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'asc'));
    getDocs(q).then(snapshot => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserReviews(fetched);
    });
  }, []);

  const allReviews = [...DEFAULT_REVIEWS, ...userReviews];

  const scrollSlider = useCallback((dir) => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector('.review-card');
    const cardWidth = card ? card.offsetWidth + 20 : 320;
    sliderRef.current.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) return;
    const newReview = {
      name: form.name.trim(),
      stars: form.stars,
      title: form.title.trim(),
      text: form.text.trim(),
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'reviews'), newReview);
    setUserReviews(prev => [...prev, { id: docRef.id, ...newReview }]);
    setForm(emptyForm);
    setShowForm(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      {/* HERO */}
      <section className="home-hero">
        <video className="hero-video" autoPlay muted loop playsInline poster="/Images/Home page/hero-poster.jpg">
          <source src={VIDEOS.hero} type="video/mp4" />
        </video>
        <div className="home-hero-content">
          <h1>
            {h.hero.line1}<br />
            {h.hero.line2}<br />
            <strong>{h.hero.strong}</strong>
          </h1>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button className="btn-primary">{h.hero.cta}</button>
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section services-section">
        <h2 className="section-title">{h.services.title}</h2>
        <div className="cards-grid">
          {serviceCards.map((card, i) => (
            <div key={i} className="card">
              <div className="card-img-wrap">
                <img src={card.img} alt={card.name} loading="lazy" decoding="async" />
                <div className="card-icon">
                  <img src={card.icon} alt="" style={{ width: 46, height: 46 }} loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="card-body">
                <h3>{card.name}</h3>
                <ul>{card.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
              </div>
              <div className="card-footer">
                <Link to={card.route} className="learn-more">{h.services.learnMore}</Link>
              </div>
            </div>
          ))}
        </div>
        <Link to="/services" style={{ textDecoration: 'none' }}>
          <button className="btn-outline-teal">{h.services.viewMore}</button>
        </Link>
      </section>

      <div className="section-divider" />

      {/* ABOUT */}
      <section className="section about-section">
        <h2 className="section-title">{h.about.title}</h2>
        <div className="about-inner">
          <div className="about-images">
            <div className="about-img-top">
              <img src="/Images/Home page/4.webp" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="about-img-bottom">
              <img src="/Images/Home page/5.webp" alt="" loading="lazy" decoding="async" />
            </div>
            <div className="about-badge">
              <span className="about-badge-num">15+</span>
              <span className="about-badge-label">{h.about.badgeLabel}</span>
            </div>
          </div>
          <div className="about-text">
            <p>{h.about.p1}</p>
            <p>{h.about.p2}</p>
          </div>
        </div>
      </section>

      <div className="about-learn-btn-wrap">
        <Link to="/about" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{ padding: '14px 30px', fontSize: 14 }}>{h.about.cta}</button>
        </Link>
      </div>

      {/* RESULTS */}
      <section id="results" className="results-section">
        <div className="section-title">{h.results.title}</div>
        <div className="rtrack-wrap">
          <ResultsCarousel pairs={BEFORE_AFTER_PAIRS} labelBefore={h.results.before} labelAfter={h.results.after} />
        </div>
      </section>

      {/* SPECIALISTS */}
      <section className="specialists">
        <h2 className="section-title">{h.specialists.title}</h2>

        <div className="specialist-row">
          <div className="spec-img-col">
            <div className="spec-img-wrap">
              <img src="/Images/Home page/6.webp" alt="Narine Ayvazyan" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" decoding="async" />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className="spec-name">{h.specialists.narine.name}</span>
            </div>
          </div>
          <div className="spec-info">
            <p>{h.specialists.narine.p1}</p>
            <p>{h.specialists.narine.p2}</p>
            <p>{h.specialists.narine.p3}</p>
          </div>
        </div>

        <div className="spec-divider" />

        <div className="specialist-row spec-row-anna" style={{ marginTop: 0 }}>
          <div className="spec-img-col">
            <div className="spec-img-wrap">
              <img src="/Images/Home page/7.webp" alt="Anna Hovsepyan" style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" decoding="async" />
            </div>
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <span className="spec-name">{h.specialists.anna.name}</span>
            </div>
          </div>
          <div className="spec-info" style={{ paddingTop: 0 }}>
            <p>{h.specialists.anna.p1}</p>
            <p>{h.specialists.anna.p2}</p>
            <p>{h.specialists.anna.p3}</p>
            <p>{h.specialists.anna.p4}</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2 className="section-title">{h.testimonials.title}</h2>
        <div className="testimonials-box">
          <div className="reviews-slider-header">
            <h3>{h.testimonials.subtitle}</h3>
            <div className="reviews-slider-arrows">
              <button className="slider-arrow" onClick={() => scrollSlider(-1)} aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="slider-arrow" onClick={() => scrollSlider(1)} aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className="reviews-slider" ref={sliderRef}>
            {allReviews.map((r, i) => (
              <div key={r.id ?? i} className={`review-card${r.featured ? ' featured' : ''}`}>
                <div className="review-header">
                  <div className="review-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <div>
                    <div className="review-author-name">{r.name}</div>
                    <div className="stars">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className={`star${j >= r.stars ? ' empty' : ''}`}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="review-title">{r.title}</div>
                <div className="review-text">{r.text}</div>
              </div>
            ))}
          </div>

          <div className="review-form-wrap">
            {submitted && (
              <div className="review-success">{h.testimonials.success}</div>
            )}
            {!showForm ? (
              <button className="btn-write-review" onClick={() => setShowForm(true)}>
                {h.testimonials.writeReview}
              </button>
            ) : (
              <form className="review-form" onSubmit={handleSubmit}>
                <div className="review-form-row">
                  <input
                    className="review-input"
                    placeholder={h.testimonials.namePlaceholder}
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                  <div className="review-star-picker">
                    {[1,2,3,4,5].map(s => (
                      <span
                        key={s}
                        className={`review-star-pick${s <= (hoverStar || form.stars) ? ' active' : ''}`}
                        onMouseEnter={() => setHoverStar(s)}
                        onMouseLeave={() => setHoverStar(0)}
                        onClick={() => setForm(f => ({ ...f, stars: s }))}
                      >★</span>
                    ))}
                  </div>
                </div>
                <input
                  className="review-input"
                  placeholder={h.testimonials.titlePlaceholder}
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
                <textarea
                  className="review-input review-textarea"
                  placeholder={h.testimonials.commentPlaceholder}
                  value={form.text}
                  onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                  required
                />
                <div className="review-form-actions">
                  <button type="button" className="btn-cancel-review" onClick={() => { setShowForm(false); setForm(emptyForm); }}>{h.testimonials.cancel}</button>
                  <button type="submit" className="btn-submit-review">{h.testimonials.submit}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
