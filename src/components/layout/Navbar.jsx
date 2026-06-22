import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useLang } from '../../context/LanguageContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { locale } = useLang();
  const n = locale.nav;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className={`menu-overlay${menuOpen ? ' visible' : ''}`} onClick={closeMenu} />
      <div className="navbar-wrapper">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/Images/logo/N Ayva Logo.svg" alt="N.Ayva" style={{ width: 120 }} />
          </Link>

          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            <NavLink to="/" end className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>{n.home}</NavLink>
            <NavLink to="/about" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>{n.about}</NavLink>
            <NavLink to="/services" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>{n.services}</NavLink>
            <NavLink to="/school" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>{n.school}</NavLink>
            <NavLink to="/contact" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} onClick={closeMenu}>{n.contact}</NavLink>
          </div>

          <Link to="/contact" style={{ textDecoration: 'none', visibility: pathname === '/contact' ? 'hidden' : 'visible' }} className="nav-book">
            <button className="btn-primary">{n.book}</button>
          </Link>

          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </nav>
      </div>
    </>
  );
}
