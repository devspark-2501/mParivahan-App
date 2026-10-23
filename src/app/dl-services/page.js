'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { ASSET_IMAGES } from '@/assets/assets';

export default function LearnerLicensePage() {
  const router = Router();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleApplyClick = () => {
    if (isLoggedIn) {
      router.push('/apply-ll');
    } else {
      // Redirect unauthenticated user to login with return path query
      router.push('/auth/login?redirect=/apply-ll');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <Header />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Driving Services</span>
            <h1 className="text-2xl font-extrabold text-slate-900">Learner's License Guidelines & Criteria</h1>
          </div>
          <button 
            onClick={handleApplyClick}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-6 py-2.5 rounded-full shadow transition-all"
          >
            Apply Now →
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Content Card 1: Need for DL */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Official Requirement</span>
            <h2 className="text-2xl font-bold text-slate-900">Need for a Driving Licence</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base border-l-4 border-orange-500 pl-4 py-1">
              No person shall drive a motor vehicle in any public place unless he holds an effective driving licence issued to him by the Licensing Authority, authorising him to drive the vehicle.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm h-48">
            <img 
              src={ASSET_IMAGES.dlSampleCard} 
              alt="Official Driving License Sample Format" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Card 2: Authorities & Track */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm h-48 order-2 md:order-1">
            <img 
              src={ASSET_IMAGES.rtoTestTrack} 
              alt="Regional Transport Office Automated Test Track" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2 space-y-4 order-1 md:order-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Governance</span>
            <h2 className="text-2xl font-bold text-slate-900">Licensing Authorities</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base border-l-4 border-blue-500 pl-4 py-1">
              The Joint Commissioner/ Deputy Commissioner and the Regional Transport Officers are the Licensing Authorities. The Administrative Officers and Motor Vehicle Inspectors are the Additional Licensing Authorities.
            </p>
          </div>
        </div>

        {/* Content Card 3: Age Limit Criteria */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">Eligibility Rules</span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">Age limit to obtain Driving Licence</h2>
            </div>
            <img 
              src={ASSET_IMAGES.trafficSignsInfographic} 
              alt="Road Safety Mandatory Rules" 
              className="w-16 h-16 object-contain hidden sm:block"
            />
          </div>

          <ul className="space-y-4 text-slate-700 text-sm sm:text-base">
            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">1</span>
              <span>An applicant under the age of eighteen years shall be granted a learner's license to drive a motor cycle without gear except with the consent in writing of the person having the care of the person desiring a learner's license.</span>
            </li>
            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">2</span>
              <span>The applicant who has completed the age of eighteen years of age is eligible to apply for a driving licence to drive a motor vehicle other than a transport vehicle.</span>
            </li>
            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="bg-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">3</span>
              <span>An applicant who has completed twenty years of age will be eligible for applying for a licence to drive a transport vehicle.</span>
            </li>
          </ul>
        </div>

        {/* Bottom Apply Action Banner */}
        <div className="bg-slate-900 text-white p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Ready to Start Your Application?</h3>
            <p className="text-slate-300 text-sm">Proceed to the verified government application portal for Learner's Licence issuance.</p>
          </div>
          <button 
            onClick={handleApplyClick}
            className="bg-orange-600 hover:bg-orange-500 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg transition-transform active:scale-95 whitespace-nowrap"
          >
            Apply for Learner's License
          </button>
        </div>

      </main>
    </div>
  );
}