import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import am from '../locales/am';

const lazyLocales = {
  en: () => import('../locales/en').then(m => m.default),
  ru: () => import('../locales/ru').then(m => m.default),
};
const localeCache = { am };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const initialLang = localStorage.getItem('lang') || 'am';
  document.documentElement.lang = initialLang;
  const [lang, setLangState] = useState(initialLang);
  const [locale, setLocale] = useState(() => localeCache[initialLang] ?? null);

  useEffect(() => {
    if (localeCache[lang]) {
      setLocale(localeCache[lang]);
      return;
    }
    lazyLocales[lang]().then(l => {
      localeCache[lang] = l;
      setLocale(l);
    });
  }, [lang]);

  const setLang = useCallback((newLang) => {
    localStorage.setItem('lang', newLang);
    document.documentElement.lang = newLang;
    setLangState(newLang);
  }, []);

  if (!locale) return null;

  return (
    <LanguageContext.Provider value={{ lang, setLang, locale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
