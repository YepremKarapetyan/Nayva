import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';
import { allServices } from './services/allServicesCards';
import { useLang } from '../context/LanguageContext';

const FEATURED_ROUTES = [
  { route: '/services/lifting',             img: '/Images/Service/New procedures/Radiowave RF Listing.webp' },
  { route: '/services/mezotherapy',         img: '/Images/Service/New procedures/Fraction mesoteraphy.webp' },
  { route: '/services/hifu',               img: '/Images/Service/New procedures/Hifu Smas Lifting.webp' },
  { route: '/services/secret-pro',          img: '/Images/Service/New procedures/RF Lifting.webp' },
  { route: '/services/dermalight-peel',     img: '/Images/Service/New procedures/dermalight peel.webp' },
  { route: '/services/acne-treatment',      img: '/Images/Service/New procedures/ACNE.webp' },
  { route: '/services/chemical-peels',      img: '/Images/Service/New procedures/chemical peels.webp' },
  { route: '/services/mens-care',           img: '/Images/Service/3.webp' },
  { route: '/services/carboxy-illumination',img: '/Images/Service/New procedures/carboxy illumination co2 detox.webp' },
  { route: '/services/carboxy-co2-detox',   img: '/Images/Service/New procedures/carboxy illumination co2 detox.webp' },
  { route: '/services/hydrafacial',         img: '/Images/Service/New procedures/hidrofacial.webp' },
  { route: '/services/oxygen-mesotherapy',  img: '/Images/Service/New procedures/Oxygen mesotheraphy.webp' },
  { route: '/services/skin-diagnostics',    img: '/Images/Service/New procedures/skin diagnostic.webp' },
  { route: '/services/beauty-recovery',     img: '/Images/Service/New procedures/beauty recovery.webp' },
  { route: '/services/vibromassage',        img: '/Images/Service/New procedures/Vibromassage.webp' },
  { route: '/services/block-age-peel',      img: '/Images/Service/New procedures/block age peel.webp' },
  { route: '/services/lactolan-peel',       img: '/Images/Service/New procedures/lactolan cream peel.webp' },
  { route: '/services/plasma-fibroblasting',img: '/Images/Service/New procedures/plasma Fibroblasting.webp', pos: 'bottom' },
  { route: '/services/microdermabrasion',   img: '/Images/Service/New procedures/Microdermabrasion.webp' },
  { route: '/services/carbon-peel',         img: '/Images/Service/New procedures/carbon peel.webp' },
  { route: '/services/carboxy-co2-therapy', img: '/Images/Service/New procedures/Carboxy co2.webp' },
];

const aparatayin2Img = allServices.find(c => c.id === 'aparatayin2')?.img ?? '';

const PACKAGE_DISCOUNTS = {
  antiage:     { original: '135,000', discounted: '81,000', pct: '-40%' },
  antiageblock:{ original: '119,000', discounted: '96,000', pct: '-19%' },
};

// id → { img, icon } — static, language-independent
const SERVICE_ASSETS = Object.fromEntries(
  allServices.map(s => [s.id, { img: s.img, icon: s.icon }])
);

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

function AllServiceCard({ svc, onClick, animClass, animDelay, highlighted }) {
  return (
    <div
      data-card-id={svc.id}
      className={`svc-featured-card${animClass ? ' ' + animClass : ''}${highlighted ? ' svc-card--highlighted' : ''}${svc.discount ? ' svc-card--discounted' : ''}`}
      style={animClass ? { animationDelay: animDelay + 'ms' } : undefined}
      onClick={onClick}
    >
      <img className="svc-featured-img" src={svc.img} alt={svc.title} loading="lazy" />
      {svc.discount && (
        <div className="svc-discount-badge">{svc.discount.pct}</div>
      )}
      <div className="svc-featured-overlay">
        <div className="svc-featured-info">
          <div className="svc-featured-icon">
            <img src={svc.icon} alt="" loading="lazy" decoding="async" />
          </div>
          <div className="svc-featured-text-group">
            <span className="svc-featured-title">{svc.title}</span>
            {svc.discount && (
              <div className="svc-price-strip">
                <span className="svc-price-original">{svc.discount.original}</span>
                <span className="svc-price-discounted">{svc.discount.discounted} AMD</span>
              </div>
            )}
          </div>
        </div>
        <span className="svc-featured-arrow">→</span>
      </div>
    </div>
  );
}

const SVC_RETURN_KEY = 'svc_return';
const SECTION_INITIAL = 6;
const CARD_STAGGER = 45;       // ms delay between each card
const CARD_ANIM_MS = 380;      // ms per card animation

function scrollToY(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (distance === 0) return;
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  let startTime = null;
  function step(ts) {
    if (!startTime) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    window.scrollTo(0, startY + distance * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// phase: 'closed' | 'opening' | 'open' | 'closing'
function useExpandSection(initialPhase = 'closed') {
  const [phase, setPhase] = useState(initialPhase);
  const titleRef = useRef(null);
  const timerRef = useRef(null);

  function toggle(extraCount) {
    clearTimeout(timerRef.current);
    const totalMs = CARD_ANIM_MS + extraCount * CARD_STAGGER + 80;

    if (phase === 'closed' || phase === 'closing') {
      setPhase('opening');
      timerRef.current = setTimeout(() => setPhase('open'), totalMs);
    } else {
      if (titleRef.current) {
        const y = window.scrollY + titleRef.current.getBoundingClientRect().top - 20;
        scrollToY(y, totalMs);
      }
      setPhase('closing');
      timerRef.current = setTimeout(() => setPhase('closed'), totalMs);
    }
  }

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return {
    isVisible:  phase !== 'closed',
    isExpanded: phase !== 'closed',
    isEntering: phase === 'opening',
    isLeaving:  phase === 'closing',
    titleRef,
    toggle,
  };
}

export default function Services() {
  const navigate = useNavigate();
  const { locale } = useLang();
  const s = locale.servicesPage;

  // Read and clear return state exactly once — must precede useExpandSection calls
  const [returnState] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SVC_RETURN_KEY);
      if (!raw) return null;
      sessionStorage.removeItem(SVC_RETURN_KEY);
      return JSON.parse(raw);
    } catch { return null; }
  });

  const faqItems = s.faq;
  const featuredPages = FEATURED_ROUTES.map((meta, i) => ({
    title: s.featuredTitles[i],
    route: meta.route,
    img: meta.img ?? aparatayin2Img,
    pos: meta.pos ?? 'center',
  }));

  const localizedCategories = s.categoryList.map(cat => ({
    id: cat.id,
    title: cat.name,
    ...SERVICE_ASSETS[cat.id],
  }));

  const localizedPackages = s.packageList.map(pkg => ({
    id: pkg.id,
    title: pkg.name,
    discount: PACKAGE_DISCOUNTS[pkg.id] ?? null,
    ...SERVICE_ASSETS[pkg.id],
  }));

  // Restore whichever section was open before the user navigated away
  const featuredInitPhase = (returnState?.sectionId === 'featured'  && returnState.sectionOpen) ? 'open' : 'closed';
  const beautyInitPhase   = (returnState?.sectionId === 'beautySvc' && returnState.sectionOpen) ? 'open' : 'closed';
  const packageInitPhase  = (returnState?.sectionId === 'packages'  && returnState.sectionOpen) ? 'open' : 'closed';

  const featured  = useExpandSection(featuredInitPhase);
  const beautySvc = useExpandSection(beautyInitPhase);
  const packages  = useExpandSection(packageInitPhase);
  const [openFaq, setOpenFaq] = useState(null);

  // Track which card to highlight (cleared after animation completes)
  const [highlightedCardId, setHighlightedCardId] = useState(returnState?.cardId ?? null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!returnState?.cardId) {
      // No specific card target — fall back to plain scroll-position restore
      if (returnState?.scrollY != null) {
        requestAnimationFrame(() => window.scrollTo(0, returnState.scrollY));
      }
      return;
    }

    // Scroll to the card the user came from, then remove the highlight
    const cardEl = document.querySelector(`[data-card-id="${returnState.cardId}"]`);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      const targetY = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      scrollToY(Math.max(0, targetY), 350);
    }
    const tid = setTimeout(() => setHighlightedCardId(null), 2500);
    return () => clearTimeout(tid);
  }, []); // intentionally empty — runs once on mount

  function goTo(route, sectionId = null, cardId = null) {
    const sectionOpen =
      sectionId === 'featured'  ? featured.isExpanded  :
      sectionId === 'beautySvc' ? beautySvc.isExpanded :
      sectionId === 'packages'  ? packages.isExpanded  :
      false;
    sessionStorage.setItem(SVC_RETURN_KEY, JSON.stringify({
      sectionId,
      cardId,
      sectionOpen,
      scrollY: window.scrollY,
    }));
    navigate(route);
  }

  return (
    <>
      {/* INTRO */}
      <section className="services-intro">
        <div className="services-intro-inner">
          <div className="intro-logo-wrap">
            <img src="/Images/all services images:icons/medical.webp" alt="" />
          </div>
          <h1 className="services-intro-heading">{s.intro.headingPrefix} <span>{s.intro.headingHighlight}</span></h1>
          <p className="intro-tagline">{s.intro.tagline.split('\n').map((line, i, arr) => i < arr.length - 1 ? <span key={i}>{line}<br /></span> : <span key={i}>{line}</span>)}</p>
        </div>
      </section>

      {/* FEATURED PROCEDURES */}
      <div className="svc-featured-wrap">
        <h2 ref={featured.titleRef} className="svc-section-title">{s.sections.featured}</h2>

        <section className="svc-featured svc-featured--init">
          {featuredPages.slice(0, SECTION_INITIAL).map((fp, i) => (
            <div
              key={fp.route}
              data-card-id={fp.route}
              className={`svc-featured-card${highlightedCardId === fp.route ? ' svc-card--highlighted' : ''}`}
              onClick={() => goTo(fp.route, 'featured', fp.route)}
            >
              <img
                className="svc-featured-img"
                src={fp.img}
                alt={fp.title}
                style={{ objectPosition: fp.pos }}
                {...(i === 0 ? { fetchPriority: 'high' } : {})}
              />
              <div className="svc-featured-overlay">
                <span className="svc-featured-title">{fp.title}</span>
                <span className="svc-featured-arrow">→</span>
              </div>
            </div>
          ))}
        </section>

        {featured.isVisible && (
          <section className="svc-featured svc-featured--cont">
            {featuredPages.slice(SECTION_INITIAL).map((fp, i) => {
              const animClass = featured.isEntering ? 'svc-card-enter' : featured.isLeaving ? 'svc-card-leave' : '';
              return (
                <div
                  key={fp.route}
                  data-card-id={fp.route}
                  className={`svc-featured-card${animClass ? ' ' + animClass : ''}${highlightedCardId === fp.route ? ' svc-card--highlighted' : ''}`}
                  style={animClass ? { animationDelay: i * CARD_STAGGER + 'ms' } : undefined}
                  onClick={() => goTo(fp.route, 'featured', fp.route)}
                >
                  <img className="svc-featured-img" src={fp.img} alt={fp.title} loading="lazy" style={{ objectPosition: fp.pos }} />
                  <div className="svc-featured-overlay">
                    <span className="svc-featured-title">{fp.title}</span>
                    <span className="svc-featured-arrow">→</span>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        <div className="svc-view-all-wrap">
          <button className="svc-view-all-btn" onClick={() => featured.toggle(featuredPages.length - SECTION_INITIAL)}>
            {featured.isExpanded ? s.toggle.showLess : s.toggle.viewAll}
          </button>
        </div>
      </div>

      {/* BEAUTY SERVICES */}
      <div className="svc-cards-wrap">
        <h2 ref={beautySvc.titleRef} className="svc-section-title svc-section-title--cards">{s.sections.beauty}</h2>

        <section className="svc-featured svc-featured--init">
          {localizedCategories.slice(0, SECTION_INITIAL).map(svc => (
            <AllServiceCard
              key={svc.id}
              svc={svc}
              onClick={() => goTo(`/services/all/${svc.id}`, 'beautySvc', svc.id)}
              highlighted={highlightedCardId === svc.id}
            />
          ))}
        </section>

        {beautySvc.isVisible && (
          <section className="svc-featured svc-featured--cont">
            {localizedCategories.slice(SECTION_INITIAL).map((svc, i) => (
              <AllServiceCard
                key={svc.id}
                svc={svc}
                onClick={() => goTo(`/services/all/${svc.id}`, 'beautySvc', svc.id)}
                animClass={beautySvc.isEntering ? 'svc-card-enter' : beautySvc.isLeaving ? 'svc-card-leave' : ''}
                animDelay={i * CARD_STAGGER}
                highlighted={highlightedCardId === svc.id}
              />
            ))}
          </section>
        )}

        {localizedCategories.length > SECTION_INITIAL && (
          <div className="svc-view-all-wrap">
            <button className="svc-view-all-btn" onClick={() => beautySvc.toggle(localizedCategories.length - SECTION_INITIAL)}>
              {beautySvc.isExpanded ? s.toggle.showLess : s.toggle.viewAll}
            </button>
          </div>
        )}
      </div>

      {/* PACKAGES */}
      <div className="svc-packages-wrap">
        <h2 ref={packages.titleRef} className="svc-section-title svc-section-title--cards">{s.sections.packages}</h2>
        <section className="svc-featured svc-featured--init">
          {localizedPackages.slice(0, SECTION_INITIAL).map(svc => (
            <AllServiceCard
              key={svc.id}
              svc={svc}
              onClick={() => goTo(`/services/all/${svc.id}`, 'packages', svc.id)}
              highlighted={highlightedCardId === svc.id}
            />
          ))}
        </section>

        {packages.isVisible && (
          <section className="svc-featured svc-featured--cont">
            {localizedPackages.slice(SECTION_INITIAL).map((svc, i) => (
              <AllServiceCard
                key={svc.id}
                svc={svc}
                onClick={() => goTo(`/services/all/${svc.id}`, 'packages', svc.id)}
                animClass={packages.isEntering ? 'svc-card-enter' : packages.isLeaving ? 'svc-card-leave' : ''}
                animDelay={i * CARD_STAGGER}
                highlighted={highlightedCardId === svc.id}
              />
            ))}
          </section>
        )}

        {localizedPackages.length > SECTION_INITIAL && (
          <div className="svc-view-all-wrap">
            <button className="svc-view-all-btn" onClick={() => packages.toggle(localizedPackages.length - SECTION_INITIAL)}>
              {packages.isExpanded ? s.toggle.showLess : s.toggle.viewAll}
            </button>
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="svc-faq-wrap">
        <h2 className="svc-section-title svc-section-title--cards">{s.sections.faq}</h2>
        <div className="svc-faq-list">
          {faqItems.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
