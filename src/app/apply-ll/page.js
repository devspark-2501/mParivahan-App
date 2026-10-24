'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INDIAN_STATES_AND_UTS } from '@/assets/assets';

export default function ApplyLLPage() {
  const [formData, setFormData] = useState({
    state: 'Delhi',
    rtoOffice: 'RTO Delhi Central',
    fullName: '',
    relation: 'Father',
    relativeName: '',
    gender: 'Male',
    dob: '',
    age: 0,
    mobile: '',
    email: '',
    aadhaar: '',
    vehicleCategory: 'MCWOG', // MCWOG = Motorcycles without gear (16-18), MCWG/LMV = 18+
    address: '',
    pincode: '',
    bloodGroup: 'A+',
    captchaInput: '',
  });

  const [captchaCode, setCaptchaCode] = useState('7K2P9M');
  const [submitted, setSubmitted] = useState(false);
  const [applicationNo, setApplicationNo] = useState('');

  // Handle Date of Birth change and calculate age
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    if (!dobValue) return;

    const birthDate = new Date(dobValue);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }

    setFormData((prev) => ({
      ...prev,
      dob: dobValue,
      age: calculatedAge,
      // Auto-restrict vehicle category if age is under 18
      vehicleCategory: calculatedAge < 18 ? 'MCWOG' : prev.vehicleCategory,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.age < 16) {
      alert('Minimum age for applying for a Learner’s Licence in India is 16 years.');
      return;
    }

    if (formData.captchaInput.toUpperCase() !== captchaCode) {
      alert('Invalid CAPTCHA code. Please try again.');
      return;
    }

    // Generate unique Application Number
    const generatedAppNo = 'LL-' + Math.floor(10000000 + Math.random() * 90000000);
    setApplicationNo(generatedAppNo);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-8 space-y-6">
        
        {/* Banner Section - CSS Built-in Gradient and SVG Graphic */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white shadow-xl border border-slate-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>
          
          <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full">
                Government of India • Ministry of Road Transport
              </span>
              <h1 className="text-3xl font-black text-white tracking-tight">
                Learner's Licence Application
              </h1>
              <p className="text-xs text-slate-300 max-w-md">
                Official online application portal for issue of New Learner's Licence (Form 2) under Motor Vehicles Act.
              </p>
            </div>

            {/* Emblem / Badge Icon */}
            <div className="w-20 h-20 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        {submitted ? (
          /* Submission Success Screen */
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Application Submitted Successfully!</h2>
              <p className="text-xs text-slate-600">
                Your Learner's Licence application has been registered in the Sarathi database.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-md mx-auto space-y-2 text-left">
              <p className="text-xs text-slate-500 font-medium">Application Number:</p>
              <p className="text-xl font-mono font-black text-slate-900 tracking-wider">{applicationNo}</p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Applicant:</strong> {formData.fullName}</p>
                <p><strong>State / RTO:</strong> {formData.state} ({formData.rtoOffice})</p>
                <p><strong>Category:</strong> {formData.vehicleCategory}</p>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          /* Learner's Licence Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
            
            {/* Section 1: Location & RTO */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b pb-2 border-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px]">1</span>
                State & RTO Selection
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    {INDIAN_STATES_AND_UTS.map((st, i) => (
                      <option key={i} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">RTO Office</label>
                  <input
                    type="text"
                    name="rtoOffice"
                    value={formData.rtoOffice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g. RTO Delhi Central"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b pb-2 border-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px]">2</span>
                Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
                    placeholder="As per Aadhaar card"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleDobChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
                    required
                  />
                  {formData.age > 0 && (
                    <p className={`text-[11px] mt-1 font-bold ${formData.age < 16 ? 'text-red-600' : 'text-emerald-700'}`}>
                      Calculated Age: {formData.age} Years {formData.age < 16 && '(Under minimum age 16)'}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Relation</label>
                  <select
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Husband">Husband</option>
                    <option value="Guardian">Guardian</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Relative Name</label>
                  <input
                    type="text"
                    name="relativeName"
                    value={formData.relativeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter relative's full name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Vehicle Category */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b pb-2 border-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px]">3</span>
                Vehicle Class
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Licence Category</label>
                <select
                  name="vehicleCategory"
                  value={formData.vehicleCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="MCWOG">Motorcycle Without Gear (50cc) - Age 16+</option>
                  {formData.age >= 18 && (
                    <>
                      <option value="MCWG">Motorcycle With Gear (MCWG) - Age 18+</option>
                      <option value="LMV">Light Motor Vehicle (Car / LMV) - Age 18+</option>
                    </>
                  )}
                </select>
                {formData.age > 0 && formData.age < 18 && (
                  <p className="text-[11px] text-amber-700 mt-1.5 font-medium bg-amber-50 p-2 rounded border border-amber-200">
                    ℹ️ Applicants aged 16 to 18 are eligible only for Motorcycle Without Gear (MCWOG).
                  </p>
                )}
              </div>
            </div>

            {/* Section 4: CAPTCHA Verification */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide border-b pb-2 border-slate-200 flex items-center gap-2">
                <span className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-[10px]">4</span>
                Security CAPTCHA
              </h3>

              <div className="flex items-center gap-4">
                <div className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-mono text-lg font-black tracking-widest select-none">
                  {captchaCode}
                </div>
                <button
                  type="button"
                  onClick={() => setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase())}
                  className="text-xs text-orange-600 font-bold hover:underline"
                >
                  ↻ Refresh Code
                </button>
              </div>

              <div>
                <input
                  type="text"
                  name="captchaInput"
                  value={formData.captchaInput}
                  onChange={handleInputChange}
                  placeholder="Enter CAPTCHA code"
                  className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500 uppercase"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl text-sm shadow-lg transition-all active:scale-95"
            >
              Submit Application →
            </button>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}