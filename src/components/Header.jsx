'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { lang, t, toggleLanguage } = useLanguage();

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      {/* Top Government Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-2 px-3 sm:px-8 flex flex-wrap justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center space-x-3 sm:space-x-6 overflow-x-auto">
          <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
            <svg className="w-3.5 h-3.5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {t.tollFree}
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden sm:inline-block text-slate-400 truncate max-w-[200px] md:max-w-none">{t.ministry}</span>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <button className="hover:text-white transition-colors whitespace-nowrap">Screen Reader Access</button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold uppercase bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">GOI</span>
            <span className="text-slate-300 font-medium whitespace-nowrap">{t.govIndia}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Emblem & Branding */}
        <Link href="/" className="flex items-center space-x-3 sm:space-x-4 min-w-0">
          <div className="flex-shrink-0">
            <svg className="w-8 h-10 sm:w-10 sm:h-12 text-slate-800" viewBox="0 0 100 120" fill="currentColor">
              <path d="M50 0 C45 10 40 15 30 20 C25 22 20 20 15 25 C10 30 15 40 20 45 C15 50 10 60 15 70 C20 80 30 80 35 75 C40 85 45 90 50 90 C55 90 60 85 65 75 C70 80 80 80 85 70 C90 60 85 50 80 45 C85 40 90 30 85 25 C80 20 75 22 70 20 C60 15 55 10 50 0 Z M50 95 L20 95 L20 102 L80 102 L80 95 Z M30 105 L70 105 L70 112 L30 112 Z" />
              <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <div className="border-l border-slate-300 pl-3 sm:pl-4 min-w-0">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 leading-none truncate">{t.portalTitle}</h1>
            <p className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 truncate">{t.portalSubtitle}</p>
          </div>
        </Link>

        {/* Links & Controls */}
        <div className="flex items-center space-x-3 sm:space-x-6 shrink-0">
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-orange-600 hover:text-orange-700">{t.home}</Link>
            <Link href="/dl-services" className="hover:text-slate-900 transition-colors">{t.dlServices}</Link>
            <Link href="/vehicle-services" className="hover:text-slate-900 transition-colors">{t.vehicleServices}</Link>
            <Link href="/about-us" className="hover:text-slate-900 transition-colors">{t.aboutUs}</Link>
            <Link href="/helpdesk" className="hover:text-slate-900 transition-colors">{t.helpdesk}</Link>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Language Selector */}
            <select 
              value={lang}
              onChange={(e) => toggleLanguage(e.target.value)}
              className="bg-slate-100 border border-slate-300 text-slate-800 text-[11px] sm:text-xs font-bold py-1.5 sm:py-2 px-2 sm:px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>

            {/* Login / Register Button */}
            <Link 
              href="/auth/login" 
              className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full shadow-sm transition-all hover:shadow-md inline-block whitespace-nowrap"
            >
              {t.loginRegister}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}