import { lazy, Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SocialFloat from './components/layout/SocialFloat';
import ErrorBoundary from './components/ErrorBoundary';
import { useLang } from './context/LanguageContext';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Lifting = lazy(() => import('./pages/services/Lifting'));
const Mezotherapy = lazy(() => import('./pages/services/Mezotherapy'));
const HIFU = lazy(() => import('./pages/services/HIFU'));
const SecretPro = lazy(() => import('./pages/services/SecretPro'));
const DermalightPeel = lazy(() => import('./pages/services/DermalightPeel'));
const AcneTreatment = lazy(() => import('./pages/services/AcneTreatment'));
const ChemicalPeels = lazy(() => import('./pages/services/ChemicalPeels'));
const MensAestheticCare = lazy(() => import('./pages/services/MensAestheticCare'));
const CarboxyIllumination = lazy(() => import('./pages/services/CarboxyIllumination'));
const CarboxyCO2Detox = lazy(() => import('./pages/services/CarboxyCO2Detox'));
const Hydrafacial = lazy(() => import('./pages/services/Hydrafacial'));
const OxygenMesotherapy = lazy(() => import('./pages/services/OxygenMesotherapy'));
const SkinDiagnostics = lazy(() => import('./pages/services/SkinDiagnostics'));
const BeautyRecovery = lazy(() => import('./pages/services/BeautyRecovery'));
const Vibromassage = lazy(() => import('./pages/services/Vibromassage'));
const BlockAgePeel = lazy(() => import('./pages/services/BlockAgePeel'));
const LactolanPeel = lazy(() => import('./pages/services/LactolanPeel'));
const PlasmaFibroblasting = lazy(() => import('./pages/services/PlasmaFibroblasting'));
const Microdermabrasion = lazy(() => import('./pages/services/Microdermabrasion'));
const CarbonPeel = lazy(() => import('./pages/services/CarbonPeel'));
const CarboxyCO2Therapy = lazy(() => import('./pages/services/CarboxyCO2Therapy'));
const ServiceDetail = lazy(() => import('./pages/services/ServiceDetail'));
const School = lazy(() => import('./pages/School'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollManager() {
  const { pathname } = useLocation();
  const prevPathname = useRef(null);
  const isInitialLoad = useRef(true);
  const { locale } = useLang();

  // Persist scroll position per route in sessionStorage
  useEffect(() => {
    const key = `scroll_pos:${pathname}`;
    const onScroll = () => sessionStorage.setItem(key, String(window.scrollY));
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  // Restore saved scroll position on page load / refresh (runs before first paint)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(`scroll_pos:${pathname}`);
    if (!saved) return;
    const targetY = parseInt(saved, 10);
    if (targetY <= 0) return;

    let done = false;

    const tryRestore = () => {
      if (done) return;
      // Only scroll once the page is tall enough to reach the target
      if (document.documentElement.scrollHeight - window.innerHeight >= targetY) {
        window.scrollTo(0, targetY);
        done = true;
      }
    };

    tryRestore();

    if (!done) {
      // Lazy content is still loading — watch for DOM size changes
      const ro = new ResizeObserver(() => {
        tryRestore();
        if (done) ro.disconnect();
      });
      ro.observe(document.body);
      const tid = setTimeout(() => {
        ro.disconnect();
        if (!done) { window.scrollTo(0, targetY); done = true; }
      }, 5000);
      return () => { ro.disconnect(); clearTimeout(tid); };
    }
  }, []); // intentionally empty — only runs on mount (refresh/initial load)

  // Scroll to top on SPA navigation (not on initial load)
  useEffect(() => {
    const prev = prevPathname.current;
    prevPathname.current = pathname;

    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return; // restoration handled by useLayoutEffect above
    }

    // Let Services.jsx handle scroll restoration when returning from a sub-route
    if (pathname === '/services' && prev !== null && prev.startsWith('/services/')) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  // Update document title on route or locale change
  useEffect(() => {
    if (!locale?.nav) return;
    const navMap = {
      '/': locale.nav.home,
      '/about': locale.nav.about,
      '/services': locale.nav.services,
      '/school': locale.nav.school,
      '/contact': locale.nav.contact,
    };
    const base = pathname.startsWith('/services/') ? locale.nav.services : navMap[pathname];
    document.title = base ? `${base} — N.Ayva Clinic` : 'N.Ayva Clinic';
  }, [pathname, locale]);

  return null;
}

function Layout() {
  return (
    <>
      <ScrollManager />
      <TopBar />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/lifting" element={<Lifting />} />
            <Route path="/services/mezotherapy" element={<Mezotherapy />} />
            <Route path="/services/hifu" element={<HIFU />} />
            <Route path="/services/secret-pro" element={<SecretPro />} />
            <Route path="/services/dermalight-peel" element={<DermalightPeel />} />
            <Route path="/services/acne-treatment" element={<AcneTreatment />} />
            <Route path="/services/chemical-peels" element={<ChemicalPeels />} />
            <Route path="/services/mens-care" element={<MensAestheticCare />} />
            <Route path="/services/carboxy-illumination" element={<CarboxyIllumination />} />
            <Route path="/services/carboxy-co2-detox" element={<CarboxyCO2Detox />} />
            <Route path="/services/hydrafacial" element={<Hydrafacial />} />
            <Route path="/services/oxygen-mesotherapy" element={<OxygenMesotherapy />} />
            <Route path="/services/skin-diagnostics" element={<SkinDiagnostics />} />
            <Route path="/services/beauty-recovery" element={<BeautyRecovery />} />
            <Route path="/services/vibromassage" element={<Vibromassage />} />
            <Route path="/services/block-age-peel" element={<BlockAgePeel />} />
            <Route path="/services/lactolan-peel" element={<LactolanPeel />} />
            <Route path="/services/plasma-fibroblasting" element={<PlasmaFibroblasting />} />
            <Route path="/services/microdermabrasion" element={<Microdermabrasion />} />
            <Route path="/services/carbon-peel" element={<CarbonPeel />} />
            <Route path="/services/carboxy-co2-therapy" element={<CarboxyCO2Therapy />} />
            <Route path="/services/all/:serviceId" element={<ServiceDetail />} />
            <Route path="/school" element={<School />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <SocialFloat />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </BrowserRouter>
  );
}
