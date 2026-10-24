'use client';

import Link from 'next/link';
import React from 'react';

const services = [
  {
    title: "Learner's Licence (LL)",
    desc: "Apply online, upload documents, and attempt the learner test digitally.",
    badge: "Step 1",
    accent: "bg-orange-500"
  },
  {
    title: "Practice Road Rules",
    desc: "Interactive mock quizzes covering traffic signs, signals, and road safety.",
    badge: "Prep",
    accent: "bg-blue-600"
  },
  {
    title: "Driving Test Slot",
    desc: "Schedule your practical driving test at your nearest RTO office.",
    badge: "Step 2",
    accent: "bg-slate-800"
  },
  {
    title: "Track Application",
    desc: "Check real-time status of your driving licence application and dispatch.",
    badge: "Status",
    accent: "bg-emerald-600"
  }
];

export default function QuickServices() {
  return (
    <section className="bg-slate-100 py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Announcement Bar */}
        <div className="bg-orange-600 text-white px-6 py-3.5 rounded-lg shadow-md mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold tracking-wide text-center sm:text-left">
            Need help applying for your driving licence? Follow our simplified citizen roadmap.
          </p>
            <Link href="/helpdesk">
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2 rounded-md whitespace-nowrap transition-colors">
                View Licensing Guide →
            </button>
          </Link>
        </div>

        {/* Core Quick Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group cursor-pointer border-t-4 border-t-slate-800 hover:border-t-orange-600"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider text-white px-2.5 py-1 rounded ${item.accent}`}>
                    {item.badge}
                  </span>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Access Portal</span>
                <span className="text-orange-600 font-bold">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}