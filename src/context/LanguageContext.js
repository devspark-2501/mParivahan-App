'use client';

import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    applyLL: "Apply for Learner's Licence",
    exploreServices: "Explore All Services",
    heroTitle: "Instant Access to Authentic Digital DL & RC Documents",
    helpdesk: "Helpdesk",
    aboutUs: "About Us",
    login: "Login / Register",
  },
  hi: {
    applyLL: "लर्नर लाइसेंस के लिए आवेदन करें",
    exploreServices: "सभी सेवाएं देखें",
    heroTitle: "प्रामाणिक डिजिटल डीएल और आरसी दस्तावेजों तक तुरंत पहुंच",
    helpdesk: "हेल्पडेस्क",
    aboutUs: "हमारे بارے में",
    login: "लॉगिन / रजिस्टर",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = (selectedLang) => {
    setLang(selectedLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);