import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

export default function NotFound() {
  const { locale } = useLang();

  return (
    <div style={{
      minHeight: '70vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20,
      padding: '60px 24px', background: '#f5efe8', textAlign: 'center',
    }}>
      <div style={{ fontSize: 80, fontWeight: 800, color: '#007f7e', fontFamily: 'Inter,sans-serif', lineHeight: 1 }}>
        404
      </div>
      <h1 style={{ fontSize: 24, fontWeight: 600, color: '#1a3330', fontFamily: 'Poppins,sans-serif', margin: 0 }}>
        {locale.notFound?.title || 'Էջը չի գտնվել'}
      </h1>
      <p style={{ color: '#666', fontFamily: 'Poppins,sans-serif', margin: 0, maxWidth: 400, lineHeight: 1.7 }}>
        {locale.notFound?.text || 'Դուք փնտրած էջը գոյություն չունի կամ տեղափոխվել է:'}
      </p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{
          background: '#007f7e', color: '#fff', border: 'none',
          borderRadius: 50, padding: '14px 40px', fontSize: 15,
          fontFamily: 'Poppins,sans-serif', cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,127,126,0.3)',
        }}>
          {locale.notFound?.btn || 'Գլխավոր էջ'}
        </button>
      </Link>
    </div>
  );
}
