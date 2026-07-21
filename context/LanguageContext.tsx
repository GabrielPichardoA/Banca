'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import es from '@/lib/translations/es.json';
import en from '@/lib/translations/en.json';
import pt from '@/lib/translations/pt.json';

export type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations = {
  es,
  en,
  pt,
};

const defaultValue: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultValue);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Cargar idioma guardado desde localStorage
    const savedLanguage = (localStorage.getItem('language') || 'es') as Language;
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Función para obtener traducciones anidadas, con soporte de interpolación {{param}}
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    if (typeof value !== 'string') {
      return key;
    }

    if (!params) {
      return value;
    }

    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) =>
      paramKey in params ? String(params[paramKey]) : match
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
