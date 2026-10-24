'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm font-sans">
      {/* Top Government Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 font-medium">
            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Toll-Free: 1800-180-0151
          </span>
          <span className="hidden sm:inline-block text-slate-400">|</span>
          <span className="hidden sm:inline-block text-slate-400">Ministry of Road Transport & Highways</span>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hover:text-white transition-colors">Screen Reader Access</button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-bold uppercase bg-slate-800 px-1.5 py-0.5 rounded text-amber-400">GOI</span>
            <span className="text-slate-300 font-medium">Govt. of India</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Emblem & Branding */}
        <Link href="/" className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg className="w-10 h-12 text-slate-800" viewBox="0 0 100 120" fill="currentColor">
              <path d="M50 0 C45 10 40 15 30 20 C25 22 20 20 15 25 C10 30 15 40 20 45 C15 50 10 60 15 70 C20 80 30 80 35 75 C40 85 45 90 50 90 C55 90 60 85 65 75 C70 80 80 80 85 70 C90 60 85 50 80 45 C85 40 90 30 85 25 C80 20 75 22 70 20 C60 15 55 10 50 0 Z M50 95 L20 95 L20 102 L80 102 L80 95 Z M30 105 L70 105 L70 112 L30 112 Z" />
              <circle cx="50" cy="55" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
          <div className="border-l border-slate-300 pl-4">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">mParivahan</h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">National Citizen Transport Portal</p>
          </div>
        </Link>

        {/* Links & Controls */}
        <div className="flex items-center space-x-6">
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-700">
            <Link href="/" className="text-orange-600 hover:text-orange-700">Home</Link>
            <Link href="/dl-services" className="hover:text-slate-900 transition-colors">DL Services</Link>
            <Link href="/vehicle-services" className="hover:text-slate-900 transition-colors">Vehicle Services</Link>
            <Link href="/about-us" className="hover:text-slate-900 transition-colors">About Us</Link>
            <Link href="/helpdesk" className="hover:text-slate-900 transition-colors">Helpdesk</Link>
          </nav>

          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <select className="bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="bn">বাংলা</option>
              <option value="ta">தமிழ்</option>
            </select>

            {/* Login / Register Button */}
            <Link 
              href="/auth/login" 
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-sm transition-all hover:shadow-md inline-block"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}