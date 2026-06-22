import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import './Lifting.css';

import { VIDEOS } from '../../config/videos';
const VIDEO_SRC = VIDEOS.carboxyIllumination;

export default function CarboxyIllumination() {
  const [open, setOpen] = useState({});
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const { locale } = useLang();
  const p = locale.serviceDetailPages.carboxyIllumination;

  function toggle(id) {
    setOpen(prev => ({ [id]: !prev[id] }));
  }

  return (
    <div className="lf-page">

      <section className="lf-hero">

        <div className="lf-hero-left">
          <h2 className="lf-hero-title">{p.title}</h2>

          <div className="lf-dropdowns">
            {p.sections.map(s => (
              <div key={s.id} className={`lf-dd${open[s.id] ? ' lf-dd--open' : ''}`}>
                <button className="lf-dd-btn" onClick={() => toggle(s.id)}>
                  <span>{s.title}</span>
                  <span className="lf-dd-toggle">{open[s.id] ? '−' : '+'}</span>
                </button>
                {open[s.id] && (
                  <div className="lf-dd-body">
                    {s.text && s.text.map((para, i) => <p key={i}>{para}</p>)}
                    {s.items && (
                      <ul>
                        {s.items.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <button className="lf-btn-outline-teal" onClick={() => navigate('/services')}>{locale.servicesPage.allServicesBtn}</button>
        </div>

        <div className="lf-hero-right">
          <video
            className="lf-video"
            src={VIDEO_SRC}
            autoPlay
            loop
            muted={muted}
            playsInline
          />
          <button className="lf-mute-btn" onClick={() => setMuted(m => !m)}>
          {muted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/>
              <path d="M15.54,8.46a5,5,0,0,1,0,7.07"/>
              <path d="M19.07,4.93a10,10,0,0,1,0,14.14"/>
            </svg>
          )}
        </button>
        </div>
      </section>

    </div>
  );
}
