import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 font-sans border-t border-slate-800 mt-auto">
      {/* Top Disclaimer / Info Strip */}
      <div className="bg-slate-900 border-b border-slate-800 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>mParivahan Services Portal • Ministry of Road Transport and Highways (MoRTH), Government of India</span>
          </div>
          <div className="text-slate-400 font-medium">
            <span>Helpline: 1800-123-4567 (Toll-Free)</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        
        {/* Col 1: About */}
        <div className="space-y-4">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            About mParivahan
          </h4>
          <p className="leading-relaxed text-slate-400">
            Digital citizen-centric application platform providing instant access to transport related services, driving licences, vehicle registration, and RTO screening tests.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            Portal Services
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="/apply-ll" className="hover:text-orange-400 transition">Apply for Learner's Licence</Link>
            </li>
            <li>
              <Link href="/admission-test" className="hover:text-orange-400 transition">RTO Online Screening Test</Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-orange-400 transition">Citizen User Dashboard</Link>
            </li>
            <li>
              <Link href="/auth/login" className="hover:text-orange-400 transition">Secure Email SSO Login</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Government Links */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            Important Portals
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="https://mparivahan.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">MoRTH Official Website</a>
            </li>
            <li>
              <a href="https://sarathi.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">Sarathi Parivahan Sewa</a>
            </li>
            <li>
              <a href="https://vahan.parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">Vahan Vehicle Registration</a>
            </li>
            <li>
              <a href="https://www.digitalindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">Digital India Initiative</a>
            </li>
          </ul>
        </div>

        {/* Col 4: Hackathon Notice */}
        <div className="space-y-3">
          <h4 className="text-white font-black uppercase tracking-wider text-sm border-l-2 border-orange-500 pl-3">
            Hackathon Project
          </h4>
          <p className="leading-relaxed text-slate-400">
            Built with Next.js, MongoDB Mongoose, and Nodemailer email authentication for high-performance government-grade reliability.
          </p>
          <div className="pt-2">
            <span className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-[10px] px-2.5 py-1 rounded-full font-bold">
              Hackathon Edition 2026
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Strip */}
      <div className="bg-black py-6 px-4 border-t border-slate-900 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© 2026 Ministry of Road Transport and Highways, Government of India. All Rights Reserved.</p>
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Hyperlinking Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}