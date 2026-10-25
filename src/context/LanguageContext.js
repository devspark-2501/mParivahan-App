'use client';

import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Header
    tollFree: "Toll-Free: 1800-180-0151",
    ministry: "Ministry of Road Transport & Highways",
    screenReader: "Screen Reader Access",
    govIndia: "Govt. of India",
    portalTitle: "mParivahan",
    portalSubtitle: "National Citizen Transport Portal",
    home: "Home",
    dlServices: "DL Services",
    vehicleServices: "Vehicle Services",
    aboutUs: "About Us",
    helpdesk: "Helpdesk",
    loginRegister: "Login / Register",

    // Hero Carousel
    slides: [
      {
        subtitle: 'Simplified Citizen Experience',
        title: 'Making Driving Licence Services Simple & Transparent',
        desc: 'Guided step-by-step application journey designed for first-time learners across all Indian states.'
      },
      {
        subtitle: 'Online Learner Services',
        title: 'Prepare & Apply for Learner’s Licence From Home',
        desc: 'Access official road rules, interactive practice tests, and instant online application submissions.'
      },
      {
        subtitle: 'Process Transparency',
        title: 'Track Your Application & Slot Status in Real-Time',
        desc: 'Complete clarity on required documents, fee structures, appointment availability, and card dispatch.'
      },
      {
        subtitle: 'Digital India Integration',
        title: 'Instant Access to Authentic Digital DL & RC Documents',
        desc: 'Seamlessly linked with DigiLocker for instant presentation to law enforcement nationwide.'
      },
      {
        subtitle: 'Inclusive & Accessible',
        title: 'Multilingual Support Designed for Every Citizen',
        desc: 'Navigate licensing workflows comfortably in regional Indian languages with assistive guidance.'
      }
    ],
    applyBtn: "Apply for Learner's Licence",
    exploreBtn: "Explore All Services",

    // Footer
    mparivahanPortal: "mParivahan Services Portal • Ministry of Road Transport and Highways (MoRTH), Government of India",
    helpline: "Helpline: 1800-123-4567 (Toll-Free)",
    aboutTitle: "About mParivahan",
    aboutDesc: "Digital citizen-centric application platform providing instant access to transport related services, driving licences, vehicle registration, and RTO screening tests.",
    servicesTitle: "Portal Services",
    rtoTestLink: "RTO Online Screening Test",
    dashboardLink: "Citizen User Dashboard",
    ssoLoginLink: "Secure Email SSO Login",
    portalsTitle: "Important Portals",
    morthLink: "MoRTH Official Website",
    sarathiLink: "Sarathi Parivahan Sewa",
    vahanLink: "Vahan Vehicle Registration",
    digitalIndiaLink: "Digital India Initiative",
    hackathonTitle: "Hackathon Project",
    hackathonDesc: "Built with Next.js, MongoDB Mongoose, and Nodemailer email authentication for high-performance government-grade reliability.",
    hackathonTag: "Hackathon Edition 2026",
    copyright: "© 2026 Ministry of Road Transport and Highways, Government of India. All Rights Reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    hyperlinkPolicy: "Hyperlinking Policy"
  },

  hi: {
    // Header
    tollFree: "टोल-फ्री: 1800-180-0151",
    ministry: "सड़क परिवहन एवं राजमार्ग मंत्रालय",
    screenReader: "स्क्रीन रीडर एक्सेस",
    govIndia: "भारत सरकार",
    portalTitle: "एमपरिवहन",
    portalSubtitle: "राष्ट्रीय नागरिक परिवहन पोर्टल",
    home: "होम",
    dlServices: "लाइसेंस सेवाएं",
    vehicleServices: "वाहन सेवाएं",
    aboutUs: "हमारे बारे में",
    helpdesk: "हेल्पडेस्क",
    loginRegister: "लॉगिन / रजिस्टर",

    // Hero Carousel
    slides: [
      {
        subtitle: 'सरलीकृत नागरिक अनुभव',
        title: 'ड्राइविंग लाइसेंस सेवाओं को सरल एवं पारदर्शी बनाना',
        desc: 'सभी भारतीय राज्यों में नए शिक्षार्थियों के लिए चरण-दर-चरण मार्गदर्शन।'
      },
      {
        subtitle: 'ऑनलाइन शिक्षार्थी सेवाएं',
        title: 'घर बैठे लर्नर लाइसेंस की तैयारी करें और आवेदन करें',
        desc: 'आधिकारिक सड़क नियमों, इंटरैक्टिव अभ्यास परीक्षाओं और त्वरित ऑनलाइन आवेदनों तक पहुंच प्राप्त करें।'
      },
      {
        subtitle: 'प्रक्रिया पारदर्शिता',
        title: 'वास्तविक समय में अपने आवेदन और स्लॉट स्थिति को ट्रैक करें',
        desc: 'आवश्यक दस्तावेजों, शुल्क संरचना, नियुक्ति उपलब्धता और कार्ड प्रेषण की पूर्ण स्पष्टता।'
      },
      {
        subtitle: 'डिजिटल इंडिया एकीकरण',
        title: 'प्रामाणिक डिजिटल डीएल और आरसी दस्तावेजों तक त्वरित पहुंच',
        desc: 'देश भर में कानून प्रवर्तन को तुरंत प्रस्तुत करने के लिए डिजीलॉकर के साथ सहजता से एकीकृत।'
      },
      {
        subtitle: 'समावेशी एवं सुलभ',
        title: 'प्रत्येक नागरिक के लिए डिज़ाइन किया गया बहुभाषी समर्थन',
        desc: 'सहायक मार्गदर्शन के साथ भारतीय क्षेत्रीय भाषाओं में लाइसेंसिंग प्रक्रियाओं को आसानी से समझें।'
      }
    ],
    applyBtn: "लर्नर लाइसेंस के लिए आवेदन करें",
    exploreBtn: "सभी सेवाएं देखें",

    // Footer
    mparivahanPortal: "एमपरिवहन सेवा पोर्टल • सड़क परिवहन और राजमार्ग मंत्रालय (MoRTH), भारत सरकार",
    helpline: "हेल्पलाइन: 1800-123-4567 (टोल-फ्री)",
    aboutTitle: "एमपरिवहन के बारे में",
    aboutDesc: "परिवहन संबंधी सेवाओं, ड्राइविंग लाइसेंस, वाहन पंजीकरण और आरटीओ स्क्रीनिंग परीक्षाओं तक त्वरित पहुंच प्रदान करने वाला डिजिटल नागरिक-केंद्रित मंच।",
    servicesTitle: "पोर्टल सेवाएं",
    rtoTestLink: "आरटीओ ऑनलाइन स्क्रीनिंग टेस्ट",
    dashboardLink: "नागरिक उपयोगकर्ता डैशबोर्ड",
    ssoLoginLink: "सुरक्षित ईमेल एसएसओ लॉगिन",
    portalsTitle: "महत्वपूर्ण पोर्टल",
    morthLink: "MoRTH आधिकारिक वेबसाइट",
    sarathiLink: "सारथी परिवहन सेवा",
    vahanLink: "वाहन पंजीकरण",
    digitalIndiaLink: "डिजिटल इंडिया पहल",
    hackathonTitle: "हैकाथॉन प्रोजेक्ट",
    hackathonDesc: "उच्च प्रदर्शन वाली सरकारी विश्वसनीयता के लिए Next.js, MongoDB Mongoose और Nodemailer के साथ निर्मित।",
    hackathonTag: "हैकाथॉन संस्करण 2026",
    copyright: "© 2026 सड़क परिवहन एवं राजमार्ग मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।",
    privacy: "गोपनीयता नीति",
    terms: "सेवा की शर्तें",
    hyperlinkPolicy: "हाइपरलिंकिंग नीति"
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