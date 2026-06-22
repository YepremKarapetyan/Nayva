import { useParams, useNavigate } from 'react-router-dom';
import './Lifting.css';
import './ServiceDetail.css';
import { allServices } from './allServicesData';
import { useLang } from '../../context/LanguageContext';

function renderItems(items) {
  return items.map(([name, price], i) => {
    let num, displayName, isSub = false, isLabel = false;
    const mainMatch = name.match(/^(\d+)\.\s*(.*)/s);
    if (mainMatch) {
      num = mainMatch[1];
      displayName = mainMatch[2];
    } else if (name.startsWith('·')) {
      num = '·';
      displayName = name.replace(/^·\s*/, '');
      isSub = true;
    } else if (name.startsWith('—')) {
      num = '';
      displayName = name.replace(/^—\s*/, '');
      isLabel = true;
    } else {
      num = i + 1;
      displayName = name;
    }
    const cls = `sd-item${isSub ? ' sd-item--sub' : ''}${isLabel ? ' sd-item--label' : ''}`;
    return (
      <li key={i} className={cls}>
        {!isLabel && <span className="sd-item-num">{num}</span>}
        <span className="sd-item-name">{displayName}</span>
        {price && <span className="sd-item-price">{price}</span>}
      </li>
    );
  });
}

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { locale } = useLang();

  const card = allServices.find(c => c.id === serviceId);
  const data = locale.serviceContent?.[serviceId] || { title: '', items: [] };

  if (!card) {
    return (
      <div className="lf-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Service not found.</p>
      </div>
    );
  }

  return (
    <div className="lf-page">
      <section className="lf-hero">
        <div className="lf-hero-left">
          <h2 className="lf-hero-title">{data.title}</h2>
          {data.subtitle && <p className="sd-subtitle">{data.subtitle}</p>}
          {data.description && <p className="sd-description">{data.description}</p>}
          <ul className="sd-list">
            {renderItems(data.items)}
          </ul>
          <button className="lf-btn-outline-teal" onClick={() => navigate('/services')}>
            {locale.servicesPage.allServicesBtn}
          </button>
        </div>
        <div className="lf-hero-right sd-img-panel">
          <img className="sd-hero-img" src={card.img} alt={data.title} />
        </div>
      </section>
    </div>
  );
}
