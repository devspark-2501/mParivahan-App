'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INDIAN_GOVT_ASSETS } from '@/assets/assets';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-10">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <img src={INDIAN_GOVT_ASSETS.nicTechCenter} alt="Ministry Center" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="relative space-y-4 max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-slate-950 px-3 py-1 rounded-full">
              National Transport e-Services Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">About Us</h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Ministry of Road Transport & Highways (MoRTH) has been facilitating computerization of over 1300+ Road Transport Offices (RTOs) across the country.
            </p>
          </div>
        </div>

        {/* Detailed Overview */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
          <h2 className="text-2xl font-black text-slate-900 border-b pb-3 border-slate-200">
            Standardizing National Transport Infrastructure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-xs text-slate-600 leading-relaxed">
            <div className="space-y-4">
              <p>
                RTOs issue Registration Certificate (R.C.) & Driving License (D.L.) that are mandatory requirements and are valid across the country, subject to certain provisions and permissions.
              </p>
              <p>
                With wide variations in state policies and manual/ system based procedures being followed across the country, it had become necessary to define same standards for these documents on a pan-India level to ensure interoperability, correctness and timely availability of information.
              </p>
              <p>
                SCOSTA committee setup for this purpose had recommended a uniform standardized software across the country. The Ministry thus entrusted National Informatics Centre (N.I.C.) with the task of standardizing & deploying two softwares - <strong>VAHAN</strong> for Vehicle Registration and <strong>SARATHI</strong> for Driving Licenses.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={INDIAN_GOVT_ASSETS.digitalSmartCard} alt="Smart Card Technology" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>

        {/* Vision, Mission & Objectives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-3">
            <span className="w-10 h-10 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-black text-base">
              👁️
            </span>
            <h3 className="text-base font-black text-slate-900 uppercase">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To improve the quality of service delivery to the citizen and the quality of work environment of the RTOs.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-3">
            <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-base">
              🎯
            </span>
            <h3 className="text-base font-black text-slate-900 uppercase">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To automate all Vehicle Registration and Driving License related activities in transport authorities with smart card technology to handle inter-state vehicle movement.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg space-y-3">
            <span className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center font-black text-base">
              📌
            </span>
            <h3 className="text-base font-black text-slate-900 uppercase">Our Objectives</h3>
            <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
              <li>Better services to Transport Department & citizens</li>
              <li>Quick implementation of government policies</li>
              <li>Instant access of Vehicle/DL information to departments</li>
            </ul>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}