import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './School.css';
import { useLang } from '../context/LanguageContext';

function useCountUp(target, duration = 2500) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(rafId.current);
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = -(Math.cos(Math.PI * progress) - 1) / 2;
            setCount(Math.floor(eased * target));
            if (progress < 1) rafId.current = requestAnimationFrame(step);
            else setCount(target);
          };
          rafId.current = requestAnimationFrame(step);
        } else {
          cancelAnimationFrame(rafId.current);
          setCount(0);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(rafId.current); };
  }, [target, duration]);

  return [count, ref];
}


function FaqItem({ item, isOpen, onToggle }) {
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  function handleToggle() {
    if (!isOpen && bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
    onToggle();
  }

  return (
    <div className={`svc-faq-item${isOpen ? ' svc-faq-item--open' : ''}`}>
      <button className="svc-faq-question" onClick={handleToggle}>
        <span>{item.q}</span>
        <span className="svc-faq-chevron">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        ref={bodyRef}
        className="svc-faq-answer"
        style={{ maxHeight: isOpen ? height + 'px' : '0px' }}
      >
        <p className="svc-faq-answer-text">{item.a}</p>
      </div>
    </div>
  );
}

const COURSE_ICONS = [
  '/Images/School/icons/school icons/school icon.svg',
  '/Images/School/icons/school icons/school icon3.svg',
  '/Images/School/icons/school icons/school icon2.svg',
];

const OFFER_ICON = '/Images/School/icons/school icons/school icon4.svg';

const WHY_IMGS = [
  '/Images/School/8.webp',
  '/Images/School/2.webp',
  '/Images/School/7.webp',
  '/Images/School/4.webp',
];

export default function School() {
  const { locale } = useLang();
  const s = locale.schoolPage;
  const cur = s.course.curriculum;

  const faqs = s.faq.items;
  const theoreticalItems = cur.theoreticalItems;
  const practicalItems = cur.practicalItems;
  const whyRows = WHY_IMGS.map((img, i) => ({ img, text: s.why.rows[i] }));

  const [count15, ref15] = useCountUp(15);
  const [count2500, ref2500] = useCountUp(2500);
  const [count100, ref100] = useCountUp(100);
  const [openFaq, setOpenFaq] = useState(null);
  const [theoryExpanded, setTheoryExpanded] = useState(false);
  const [practiceExpanded, setPracticeExpanded] = useState(false);
  const theoryRef = useRef(null);
  const practiceRef = useRef(null);
  const moreTheoryRef = useRef(null);
  const morePracticeRef = useRef(null);

  const smoothScrollTo = (element, duration = 1600) => {
    const targetY = element.getBoundingClientRect().top + window.scrollY - 20;
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start = null;

    const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutSine(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const collapseMore = (el, setState, blockRef) => {
    el.style.maxHeight = el.scrollHeight + 'px';
    el.offsetHeight;
    el.style.maxHeight = '0';
    setState(false);
    setTimeout(() => blockRef.current && smoothScrollTo(blockRef.current), 80);
  };

  const expandMore = (el, setState) => {
    el.style.maxHeight = el.scrollHeight + 'px';
    setState(true);
    el.addEventListener('transitionend', () => { el.style.maxHeight = 'none'; }, { once: true });
  };

  const toggleTheory = () => {
    if (theoryExpanded) {
      collapseMore(moreTheoryRef.current, setTheoryExpanded, theoryRef);
    } else {
      expandMore(moreTheoryRef.current, setTheoryExpanded);
    }
  };

  const togglePractice = () => {
    if (practiceExpanded) {
      collapseMore(morePracticeRef.current, setPracticeExpanded, practiceRef);
    } else {
      expandMore(morePracticeRef.current, setPracticeExpanded);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="school-hero">
        <div className="school-hero-bg" />
        <div className="school-hero-overlay" />
        <div className="school-hero-content">
          <h1>{s.hero.title}</h1>
          <p>{s.hero.subtitle}</p>
          <div className="school-hero-btn-wrap">
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button className="btn-outline-white">{s.hero.registerBtn}</button>
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <img src="/Images/School/icons/icon school.svg" alt="" style={{ width: 100, height: 100 }} />
            </div>
            <div className="stat-text">
              <div className="stat-num" ref={ref15}>{count15}+</div>
              <div className="stat-label">{s.hero.stats.courses.label.split('\n').map((l,i,a)=>i<a.length-1?<span key={i}>{l}<br/></span>:<span key={i}>{l}</span>)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <img src="/Images/School/icons/shool icon1.svg" alt="" style={{ width: 100, height: 100 }} />
            </div>
            <div>
              <div className="stat-num" ref={ref2500}>{count2500.toLocaleString()}+</div>
              <div className="stat-label">{s.hero.stats.students.label.split('\n').map((l,i,a)=>i<a.length-1?<span key={i}>{l}<br/></span>:<span key={i}>{l}</span>)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <img src="/Images/School/icons/shcool icon2.svg" alt="" style={{ width: 100, height: 100 }} />
            </div>
            <div>
              <div className="stat-num" ref={ref100}>{count100}%</div>
              <div className="stat-label">{s.hero.stats.satisfaction.label.split('\n').map((l,i,a)=>i<a.length-1?<span key={i}>{l}<br/></span>:<span key={i}>{l}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="why-section">
        <h2 className="why-title">{s.why.title}</h2>
        <p className="why-subtitle">{s.why.subtitle}</p>
        {whyRows.map((row, i) => (
          <div key={i} className={`why-row${i % 2 !== 0 ? ' alt' : ''}`}>
            <div className="why-row-img">
              <img src={row.img} alt={row.text} loading="lazy" decoding="async" />
            </div>
            <div className="why-row-text">
              <span>{row.text}</span>
            </div>
          </div>
        ))}
      </section>

      {/* TRAINING PROGRAMS */}
      <section className="course-section">
        <div className="course-section-header">
          <span className="course-badge">{s.course.badge}</span>
          <h2 className="course-title">{s.course.title}</h2>
          <div className="course-title-divider"><span className="course-title-divider-dot" /></div>
        </div>

        <p className="course-intro-text">{s.course.intro}</p>

        <div className="course-info-grid">
          {COURSE_ICONS.map((icon, ci) => (
            <div key={ci} className="course-info-card">
              <div className="course-info-icon-wrap">
                <img src={icon} alt="" loading="lazy" decoding="async" />
              </div>
              <div className="course-info-content">
                <h4 className="course-info-title">{s.course.infoCards[ci].title}</h4>
                <ul className="course-info-list">
                  {s.course.infoCards[ci].items.map((item, ii) => (
                    <li key={ii}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="course-offer-banner">
          <span className="course-offer-label">
            <img src={OFFER_ICON} alt="" loading="lazy" decoding="async" />
            {s.course.offer.label}
          </span>
          <p>{s.course.offer.text}</p>
        </div>

        <div className="course-note">
          <strong>Important note:</strong> {s.course.note}
        </div>

        <div className="curriculum-wrap">
          <div className="curriculum-block" ref={theoryRef}>
            <div className="curriculum-header">
              <span className="curriculum-header-icon"></span>
              <span>{cur.theoryHeader}</span>
            </div>
            <ol className="curriculum-list curriculum-preview" style={{ counterReset: 'item 0' }}>
              {theoreticalItems.slice(0, 5).map((item, i) => (
                <li key={i}>
                  {typeof item === 'string' ? item : (
                    <div>
                      {item.title}
                      <ol className="curriculum-sub-list">
                        {item.subs.map((sub, j) => <li key={j}>{sub}</li>)}
                      </ol>
                    </div>
                  )}
                </li>
              ))}
            </ol>
            <div className="curriculum-more" ref={moreTheoryRef}>
              <ol className="curriculum-list curriculum-rest" style={{ counterReset: 'item 5' }}>
                {theoreticalItems.slice(5).map((item, i) => (
                  <li key={i}>
                    {typeof item === 'string' ? item : (
                      <div>
                        {item.title}
                        <ol className="curriculum-sub-list">
                          {item.subs.map((sub, j) => <li key={j}>{sub}</li>)}
                        </ol>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
            <div className="curriculum-expand-wrap">
              <button className="btn-view-more" onClick={toggleTheory}>
                {theoryExpanded ? cur.showLess : cur.showMore}
              </button>
            </div>
          </div>

          <div className="curriculum-block" ref={practiceRef}>
            <div className="curriculum-header">
              <span className="curriculum-header-icon"></span>
              <span>{cur.practiceHeader}</span>
            </div>
            <ol className="curriculum-list curriculum-preview" style={{ counterReset: 'item 0' }}>
              {practicalItems.slice(0, 5).map((item, i) => <li key={i}>{item}</li>)}
            </ol>
            <div className="curriculum-more" ref={morePracticeRef}>
              <ol className="curriculum-list curriculum-rest" style={{ counterReset: 'item 5' }}>
                {practicalItems.slice(5).map((item, i) => <li key={i}>{item}</li>)}
              </ol>
            </div>
            <div className="curriculum-expand-wrap">
              <button className="btn-view-more" onClick={togglePractice}>
                {practiceExpanded ? cur.showLess : cur.showMore}
              </button>
            </div>
          </div>
        </div>

        <div className="course-closing">
          {s.course.closing.map((text, i) => (
            <div key={i} className="course-closing-item">
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="course-join-wrap">
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <button className="btn-join">{s.course.joinBtn}</button>
          </Link>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="instructor-section">
        <h2 className="instructor-title">{s.instructor.title}</h2>
        <div className="instructor-circle">
          <img src="/Images/School/6.webp" alt={s.instructor.name} loading="lazy" decoding="async" />
        </div>
        <div className="instructor-info">
          <div className="instructor-name">{s.instructor.name}</div>
          <div className="instructor-role">{s.instructor.role}</div>
          <div className="instructor-exp">{s.instructor.exp}</div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <h2>{s.cta.title}</h2>
        <p>{s.cta.subtitle}</p>
        <Link to="/contact" style={{ textDecoration: 'none' }}>
          <button className="btn-outline-white">{s.cta.btn}</button>
        </Link>
      </section>

      {/* FAQ */}
      <div className="svc-faq-wrap">
        <h2 className="svc-section-title svc-section-title--cards">{s.faq.title}</h2>
        <div className="svc-faq-list">
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              item={faq}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
