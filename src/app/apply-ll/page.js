'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INDIAN_STATES_AND_UTS, INDIAN_GOVT_ASSETS } from '@/assets/assets';

export default function ApplyLLPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    state: 'Delhi',
    rtoOffice: 'RTO Delhi Central (DL-01)',
    fullName: '',
    relation: 'Father',
    relativeName: '',
    gender: 'Male',
    dob: '',
    age: 0,
    mobile: '',
    email: '',
    aadhaar: '',
    vehicleCategory: 'MCWOG',
    address: '',
    pincode: '',
    bloodGroup: 'A+',
    captchaInput: '',
  });

  const [idFile, setIdFile] = useState(null);
  const [birthFile, setBirthFile] = useState(null);
  const [captchaCode, setCaptchaCode] = useState('7K9M2P');
  const [submitted, setSubmitted] = useState(false);
  const [applicationNo, setApplicationNo] = useState('');

  // Calculate age dynamically from DOB and update age-gated choices
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
      alert("Minimum age requirement for a Learner's Licence in India is 16 years.");
      return;
    }

    if (formData.captchaInput.toUpperCase() !== captchaCode) {
      alert('Invalid Security CAPTCHA code. Please try again.');
      return;
    }

    const generatedAppNo = 'LL-' + Math.floor(10000000 + Math.random() * 90000000);
    setApplicationNo(generatedAppNo);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      {/* Top Ministry Banner Strip */}
      <div className="bg-slate-900 text-white py-2 px-4 border-b border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img src={INDIAN_GOVT_ASSETS.emblemOfIndia} alt="Emblem" className="h-6 w-auto filter invert brightness-200" />
            <span className="font-semibold text-slate-300">MoRTH • Ministry of Road Transport and Highways</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
            <span>Official Sarathi Portal</span>
            <span>•</span>
            <span className="text-orange-400 font-bold">Government of India</span>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Main Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 text-white shadow-2xl border border-slate-800">
          <img 
            src={INDIAN_GOVT_ASSETS.heroBannerBg} 
            alt="National Highway Infrastructure" 
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>

          <div className="relative p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left max-w-2xl">
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                <span className="inline-block text-[11px] font-black uppercase tracking-wider bg-orange-500 text-slate-950 px-3 py-1 rounded-full shadow">
                  FORM 2 • MV ACT 1988
                </span>
                <span className="text-xs text-slate-300 font-semibold bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                  e-Governance Citizen Services
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Application for Issue of <span className="text-orange-500">Learner's Licence</span>
              </h1>
              
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Submit your official application, upload supporting document proofs, and complete the instant online RTO screening test to secure your digital Learner's Licence.
              </p>
            </div>

            {/* Official Digital India & Emblem Badges */}
            <div className="flex flex-row md:flex-col items-center gap-4 shrink-0 bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-md">
              <img src={INDIAN_GOVT_ASSETS.emblemOfIndia} alt="State Emblem" className="h-12 w-auto filter invert" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">Satyameva Jayate</p>
                <p className="text-[9px] font-bold text-slate-300">Govt. of India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-10">
          
          {/* Section 1: Jurisdiction & RTO */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                1
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">State & RTO Office Jurisdiction</h3>
                <p className="text-xs text-slate-500">Select the state and regional transport office responsible for your jurisdiction.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select State / UT *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {INDIAN_STATES_AND_UTS.map((st, i) => (
                    <option key={i} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">RTO Office Location *</label>
                <input
                  type="text"
                  name="rtoOffice"
                  value={formData.rtoOffice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. RTO Delhi Central (DL-01)"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Personal & Contact Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                2
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">Applicant & Contact Information</h3>
                <p className="text-xs text-slate-500">Enter personal details and official identity credentials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Name (As per Aadhaar) *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleDobChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  required
                />
                {formData.age > 0 && (
                  <p className={`text-xs mt-1.5 font-bold ${formData.age < 16 ? 'text-red-600' : 'text-emerald-700'}`}>
                    Calculated Age: {formData.age} Years {formData.age < 16 && '(Eligible age is 16+)'}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Relation *</label>
                <select
                  name="relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Husband">Husband</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Relative's Full Name *</label>
                <input
                  type="text"
                  name="relativeName"
                  value={formData.relativeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter relative's full name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Gender *</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="citizen@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Aadhaar Card Number *</label>
                <input
                  type="text"
                  name="aadhaar"
                  value={formData.aadhaar}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="12-digit Aadhaar number"
                  maxLength={12}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Permanent Residential Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="Flat / House No., Street, Locality"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
                  placeholder="6-digit pincode"
                  maxLength={6}
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 3: Visual Vehicle Category Cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                3
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">Class of Vehicles (COV)</h3>
                <p className="text-xs text-slate-500">Select the vehicle category you are applying to operate.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              
              {/* Card 1: Two Wheeler (50cc / MCWOG) */}
              <div 
                onClick={() => setFormData({ ...formData, vehicleCategory: 'MCWOG' })}
                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all shadow-md ${
                  formData.vehicleCategory === 'MCWOG' ? 'border-orange-600 ring-2 ring-orange-500/50 bg-orange-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img src={INDIAN_GOVT_ASSETS.twoWheelerImg} alt="Motorcycle" className="h-32 w-full object-cover" />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider bg-orange-100 px-2 py-0.5 rounded">
                    Age 16+ Allowed
                  </span>
                  <h4 className="text-sm font-black text-slate-900">MCWOG / Scooter</h4>
                  <p className="text-[11px] text-slate-500">Motorcycle Without Gear (Engine capacity up to 50cc)</p>
                </div>
              </div>

              {/* Card 2: Motorcycle With Gear (MCWG) */}
              <div 
                onClick={() => {
                  if (formData.age < 18 && formData.age !== 0) {
                    alert("Motorcycle With Gear (MCWG) requires minimum age of 18 years.");
                    return;
                  }
                  setFormData({ ...formData, vehicleCategory: 'MCWG' });
                }}
                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all shadow-md ${
                  formData.age < 18 && formData.age !== 0 ? 'opacity-40 cursor-not-allowed bg-slate-100' : ''
                } ${
                  formData.vehicleCategory === 'MCWG' ? 'border-orange-600 ring-2 ring-orange-500/50 bg-orange-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img src={INDIAN_GOVT_ASSETS.twoWheelerImg} alt="Motorcycle With Gear" className="h-32 w-full object-cover filter contrast-125" />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">
                    Age 18+ Mandatory
                  </span>
                  <h4 className="text-sm font-black text-slate-900">MCWG (With Gear)</h4>
                  <p className="text-[11px] text-slate-500">All geared motorcycles and geared two-wheelers</p>
                </div>
              </div>

              {/* Card 3: Light Motor Vehicle (LMV / Car) */}
              <div 
                onClick={() => {
                  if (formData.age < 18 && formData.age !== 0) {
                    alert("Light Motor Vehicle (LMV) requires minimum age of 18 years.");
                    return;
                  }
                  setFormData({ ...formData, vehicleCategory: 'LMV' });
                }}
                className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all shadow-md ${
                  formData.age < 18 && formData.age !== 0 ? 'opacity-40 cursor-not-allowed bg-slate-100' : ''
                } ${
                  formData.vehicleCategory === 'LMV' ? 'border-orange-600 ring-2 ring-orange-500/50 bg-orange-50/30' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <img src={INDIAN_GOVT_ASSETS.fourWheelerImg} alt="Light Motor Vehicle" className="h-32 w-full object-cover" />
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">
                    Age 18+ Mandatory
                  </span>
                  <h4 className="text-sm font-black text-slate-900">LMV (Car / Jeep)</h4>
                  <p className="text-[11px] text-slate-500">Light Motor Vehicles, motorcars, and non-transport jeeps</p>
                </div>
              </div>

            </div>
          </div>

          {/* Section 4: Drag & Drop Document Uploads */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                4
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">Upload Supporting Document Proofs</h3>
                <p className="text-xs text-slate-500">Upload clear scanned copies or photos of your identification and age proofs.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              
              {/* Document 1: Aadhaar Card / ID Proof */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50 hover:bg-slate-100 transition shadow-sm">
                <span className="text-3xl">📄</span>
                <div>
                  <p className="text-xs font-black text-slate-900">Identity / Aadhaar Card Proof *</p>
                  <p className="text-[11px] text-slate-500">Drag & drop your file here or click browse</p>
                </div>
                <input 
                  type="file" 
                  onChange={(e) => setIdFile(e.target.files[0]?.name)} 
                  className="hidden" 
                  id="idDoc" 
                />
                <label htmlFor="idDoc" className="inline-block bg-slate-900 text-white text-xs px-5 py-2.5 rounded-xl font-bold cursor-pointer hover:bg-slate-800 transition">
                  {idFile ? `Selected: ${idFile}` : 'Browse File'}
                </label>
              </div>

              {/* Document 2: Birth Certificate */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3 bg-slate-50 hover:bg-slate-100 transition shadow-sm">
                <span className="text-3xl">🎂</span>
                <div>
                  <p className="text-xs font-black text-slate-900">Birth Certificate / Age Proof *</p>
                  <p className="text-[11px] text-slate-500">Drag & drop your file here or click browse</p>
                </div>
                <input 
                  type="file" 
                  onChange={(e) => setBirthFile(e.target.files[0]?.name)} 
                  className="hidden" 
                  id="birthDoc" 
                />
                <label htmlFor="birthDoc" className="inline-block bg-slate-900 text-white text-xs px-5 py-2.5 rounded-xl font-bold cursor-pointer hover:bg-slate-800 transition">
                  {birthFile ? `Selected: ${birthFile}` : 'Browse File'}
                </label>
              </div>

            </div>
          </div>

          {/* Section 5: Security CAPTCHA */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b pb-3 border-slate-200">
              <span className="w-8 h-8 bg-orange-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow">
                5
              </span>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase">Security Verification</h3>
                <p className="text-xs text-slate-500">Type the characters shown in the CAPTCHA box to prevent automated submissions.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <div className="bg-slate-900 text-orange-400 px-6 py-3 rounded-2xl font-mono text-xl font-black tracking-widest border border-slate-800 shadow-inner select-none">
                {captchaCode}
              </div>
              <button
                type="button"
                onClick={() => setCaptchaCode(Math.random().toString(36).substring(2, 8).toUpperCase())}
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                ↻ Refresh Code
              </button>
              <input
                type="text"
                name="captchaInput"
                value={formData.captchaInput}
                onChange={handleInputChange}
                placeholder="Enter CAPTCHA"
                className="w-full sm:w-64 px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold uppercase focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          {/* Submit Application Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl text-sm shadow-xl transition-all active:scale-95"
          >
            Submit Learner's Licence Application →
          </button>

        </form>
      </main>

      {/* Success Popup Modal */}
      {submitted && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
              ✓
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Application Registered
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Form Submitted Successfully!</h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your application has been logged in the Sarathi database with Reference Number:
              </p>
              <div className="bg-slate-100 p-3 rounded-xl font-mono text-lg font-black text-slate-900 border border-slate-300 tracking-wider">
                {applicationNo}
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 text-left space-y-1.5">
              <p><strong>Applicant:</strong> {formData.fullName}</p>
              <p><strong>RTO Jurisdiction:</strong> {formData.rtoOffice}</p>
              <p><strong>Applied Category:</strong> {formData.vehicleCategory}</p>
            </div>

            <button
              onClick={() => router.push('/admission-test')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl text-xs shadow-xl transition-all active:scale-95"
            >
              Appear for Online RTO Screening Test Now →
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}