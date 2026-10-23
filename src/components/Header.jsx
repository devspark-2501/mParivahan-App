'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand & State Emblem */}
        <div className="flex items-center space-x-4">
          <div className="p-1 bg-amber-50 rounded-lg border border-amber-200">
            {/* Ashoka Emblem SVG Vector */}
            <svg className="w-9 h-9 text-amber-700" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L9 7H15L12 2ZM12 22C11.4 22 11 21.6 11 21V19H13V21C13 21.6 12.6 22 12 22ZM7 9L4 14H8L9 9H7ZM17 9L15 9L16 14H20L17 9ZM12 8C9.8 8 8 9.8 8 12C8 14.2 9.8 16 12 16C14.2 16 16 14.2 16 12C16 9.8 14.2 8 12 8ZM12 14.5C10.6 14.5 9.5 13.4 9.5 12C9.5 10.6 10.6 9.5 12 9.5C13.4 9.5 14.5 10.6 14.5 12C14.5 13.4 13.4 14.5 12 14.5Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">mParivahan</span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-full border border-blue-200">OFFICIAL</span>
            </div>
            <p className="text-xs font-medium text-slate-500">Ministry of Road Transport & Highways • Govt. of India</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="appearance-none bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2.5 pl-9 pr-8 rounded-full border border-slate-300 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="ta">தமிழ் (Tamil)</option>
            </select>
            <svg className="w-4 h-4 text-slate-600 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1 4h6m-3 0v11M4 19h16" />
            </svg>
          </div>

          <button className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-transform active:scale-95">
            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>Login / Register</span>
          </button>
        </div>

      </div>
    </header>
  );
}