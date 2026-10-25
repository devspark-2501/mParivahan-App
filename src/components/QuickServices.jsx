'use client';

import Link from 'next/link';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function QuickServices() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-100 py-10 sm:py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Announcement Bar */}
        <div className="bg-orange-600 text-white px-4 sm:px-6 py-3.5 rounded-lg shadow-md mb-8 sm:mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-semibold tracking-wide">
            {t.quickServicesBanner}
          </p>
          <Link href="/helpdesk" className="shrink-0">
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-md whitespace-nowrap transition-colors">
              {t.viewGuideBtn}
            </button>
          </Link>
        </div>

        {/* Core Quick Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.servicesList.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.route}
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group cursor-pointer border-t-4 border-t-slate-800 hover:border-t-orange-600"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider text-white px-2.5 py-1 rounded ${item.accent}`}>
                    {item.badge}
                  </span>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>{t.accessPortal}</span>
                <span className="text-orange-600 font-bold">→</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}