'use client';

import React from 'react';

const services = [
  {
    title: "Apply for Learner's Licence",
    desc: "Step-by-step guidance for first-time applicants",
    icon: (
      <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    title: "Practice Mock Test",
    desc: "Interactive road signs and safety rules quiz",
    icon: (
      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )
  },
  {
    title: "Book Driving Test Slot",
    desc: "Schedule RTO appointments effortlessly",
    icon: (
      <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Track Application Status",
    desc: "Check real-time application and dispatch status",
    icon: (
      <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }
];

export default function QuickServices() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-30 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer"
          >
            <div className="p-3 bg-slate-50 rounded-xl w-fit group-hover:bg-blue-50 transition-colors mb-4">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {service.title}
            </h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}