'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INDIAN_GOVT_ASSETS } from '@/assets/assets';

export default function LearnerLicensePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
              Government of India • Ministry of Road Transport
            </span>
            <h1 className="text-3xl font-black text-white">Driving Licence Services</h1>
            <p className="text-xs text-slate-300 max-w-md">
              Information on legal requirements, licensing authorities, and online application procedures under MV Act 1988.
            </p>
          </div>
          <button
            onClick={() => router.push('/apply-ll')}
            className="bg-orange-600 hover:bg-orange-700 text-white font-black text-xs px-6 py-4 rounded-2xl shadow-lg transition active:scale-95 shrink-0"
          >
            Apply for Learner's Licence →
          </button>
        </div>

        {/* Need for DL Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-black uppercase text-orange-700 bg-orange-50 px-2.5 py-1 rounded border border-orange-200">
              OFFICIAL REQUIREMENT
            </span>
            <h2 className="text-2xl font-black text-slate-900">Need for a Driving Licence</h2>
            <p className="text-xs text-slate-600 leading-relaxed border-l-4 border-orange-500 pl-4 py-1">
              No person shall drive a motor vehicle in any public place unless he holds an effective driving licence issued to him by the Licensing Authority, authorising him to drive the vehicle.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img src={INDIAN_GOVT_ASSETS.dlCardSample} alt="Official Driving License Sample Format" className="w-full h-44 object-cover" />
          </div>
        </div>

        {/* Licensing Authorities Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm order-2 md:order-1">
            <img src={INDIAN_GOVT_ASSETS.rtoTestTrack} alt="Regional Transport Office Automated Test Track" className="w-full h-44 object-cover" />
          </div>
          <div className="md:col-span-2 space-y-3 order-1 md:order-2">
            <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
              GOVERNANCE
            </span>
            <h2 className="text-2xl font-black text-slate-900">Licensing Authorities</h2>
            <p className="text-xs text-slate-600 leading-relaxed border-l-4 border-blue-500 pl-4 py-1">
              The Joint Commissioner/ Deputy Commissioner and the Regional Transport Officers are the Licensing Authorities. The Administrative Officers and Motor Vehicle Inspectors are the Additional Licensing Authorities.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}