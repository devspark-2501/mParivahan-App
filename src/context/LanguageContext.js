'use client';

import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    brand: "mParivahan",
    home: "Home",
    dlServices: "DL Services",
    vehicleServices: "Vehicle Services",
    aboutUs: "About Us",
    helpdesk: "Helpdesk",
    loginRegister: "Login / Register",
    
    // Homepage Hero
    digitalBadge: "● DIGITAL INDIA INTEGRATION",
    heroTitle1: "Instant Access to Authentic ",
    heroTitleHighlight: "Digital DL & RC ",
    heroTitle2: "Documents",
    heroSubtitle: "Seamlessly linked with DigiLocker for instant presentation to law enforcement nationwide.",
    applyBtn: "Apply for Learner's Licence →",
    exploreBtn: "Explore Helpdesk & Guide",
  },
  hi: {
    brand: "एमपरिवहन",
    home: "होम",
    dlServices: "लाइसेंस सेवाएं",
    vehicleServices: "वाहन सेवाएं",
    aboutUs: "हमारे बारे में",
    helpdesk: "हेल्पडेस्क",
    loginRegister: "लॉगिन / रजिस्टर",
    
    // Homepage Hero
    digitalBadge: "● डिजिटल इंडिया इंटीग्रेशन",
    heroTitle1: "प्रामाणिक ",
    heroTitleHighlight: "डिजिटल डीएल और आरसी ",
    heroTitle2: "दस्तावेजों तक त्वरित पहुंच",
    heroSubtitle: "देश भर में कानून प्रवर्तन को तुरंत दिखाने के लिए डिजीलॉकर के साथ सहजता से जुड़ा हुआ।",
    applyBtn: "लर्नर लाइसेंस के लिए आवेदन करें →",
    exploreBtn: "हेल्पडेस्क और गाइड देखें",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLanguage = (newLang) => {
    setLang(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang], toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);