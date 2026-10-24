'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { INDIAN_GOVT_ASSETS } from '@/assets/assets';

export default function HelpdeskPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-slate-950 px-3 py-1 rounded-full">
              Citizen Support & Guide
            </span>
            <h1 className="text-3xl font-black text-white">mParivahan Helpdesk</h1>
            <p className="text-xs text-slate-300 max-w-md">
              Comprehensive guide on applying for Learner's Licence, uploading documents, and passing your RTO test.
            </p>
          </div>
          <img src={INDIAN_GOVT_ASSETS.helpdeskSupport} alt="Customer Support" className="w-32 h-32 rounded-2xl object-cover border border-white/20" />
        </div>

        {/* Step by Step Guide */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b pb-3 border-slate-200">
            How to Apply for a Learner's Licence (Step-by-Step)
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">1</span>
              <div>
                <h3 className="text-sm font-black text-slate-900">Step 1: Fill Applicant Details & Jurisdiction</h3>
                <p className="text-xs text-slate-600">Select your State/UT and choose your nearest Regional Transport Office (RTO).</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">2</span>
              <div>
                <h3 className="text-sm font-black text-slate-900">Step 2: Upload Identity & Address Proofs</h3>
                <p className="text-xs text-slate-600">Drag and drop your supporting documents (Aadhaar or Birth Certificate) directly in the application form.</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-xs shrink-0">3</span>
              <div>
                <h3 className="text-sm font-black text-slate-900">Step 3: Submit Application & Appear for Screening Test</h3>
                <p className="text-xs text-slate-600">Upon form submission, click "Appear for Test Now" to take your 10-question online RTO screening test (score 6/10 to pass).</p>
              </div>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link href="/apply-ll" className="inline-block bg-orange-600 text-white font-black text-xs px-8 py-4 rounded-2xl hover:bg-orange-700 transition">
              Start Application Now →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}