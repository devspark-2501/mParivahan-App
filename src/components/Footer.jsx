'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800 mt-auto">
      {/* Top Disclaimer / Info Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <span>{t.mparivahanPortal}</span>
          </div>
          <div className="text-slate-400 font-medium whitespace-nowrap">
            <span>{t.helpline}</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        
        {/* Col 1: About */}
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            {t.aboutTitle}
          </h4>
          <p className="leading-relaxed text-slate-400">
            {t.aboutDesc}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            {t.servicesTitle}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/apply-ll" className="hover:text-orange-400 transition">{t.applyBtn}</Link>
            </li>
            <li>
              <Link href="/admission-test" className="hover:text-orange-400 transition">{t.rtoTestLink}</Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-orange-400 transition">{t.dashboardLink}</Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-orange-400 transition">{t.ssoLoginLink}</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Government Links */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            {t.portalsTitle}
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="https://mparivahan.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">{t.morthLink}</a>
            </li>
            <li>
              <a href="https://sarathi.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">{t.sarathiLink}</a>
            </li>
            <li>
              <a href="https://vahan.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">{t.vahanLink}</a>
            </li>
            <li>
              <a href="https://www.digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">{t.digitalIndiaLink}</a>
            </li>
          </ul>
        </div>

        {/* Col 4: Hackathon Notice */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            {t.hackathonTitle}
          </h4>
          <p className="leading-relaxed text-slate-400">
            {t.hackathonDesc}
          </p>
          <div className="pt-2">
            <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold">
              {t.hackathonTag}
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-black py-6 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>{t.copyright}</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <span className="hover:underline cursor-pointer">{t.privacy}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t.terms}</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">{t.hyperlinkPolicy}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}