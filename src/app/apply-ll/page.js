'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { ASSET_IMAGES, INDIAN_STATES_AND_UTS } from '@/assets/assets';

export default function ApplyLLPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    email: '',
    mobile: '',
    state: 'Delhi',
    city: '',
    address: '',
    aadhaar: '',
    dob: '',
    birthCert: null,
    aadhaarCopy: null
  });

  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [age, setAge] = useState(null);
  const [isUnder18, setIsUnder18] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate random 6-character alphanumeric CAPTCHA
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Calculate age dynamically from DOB
  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setFormData({ ...formData, dob: dobValue });

    if (dobValue) {
      const birthDate = new Date(dobValue);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);
      setIsUnder18(calculatedAge >= 16 && calculatedAge < 18);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userCaptcha.toUpperCase() !== captchaCode) {
      alert('Invalid CAPTCHA code! Please try again.');
      generateCaptcha();
      setUserCaptcha('');
      return;
    }

    if (age < 16) {
      alert('You must be at least 16 years old to apply for a Learner License.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/apply-ll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age,
          licenseCategory: isUnder18 ? 'Junior (Motorcycle Without Gear 16-18)' : 'Standard Driver (18+)',
          birthCertFileName: formData.birthCert ? formData.birthCert.name : 'birth_certificate.pdf',
          aadhaarCopyFileName: formData.aadhaarCopy ? formData.aadhaarCopy.name : 'aadhaar_card.pdf'
        })
      });

      if (res.ok) {
        alert(`Application Submitted Successfully! Category: ${isUnder18 ? 'Junior Learner (16-18)' : 'Standard Driving License'}`);
      } else {
        alert('Failed to submit application.');
      }
    } catch (err) {
      alert('Error submitting form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto my-10 px-4 sm:px-6">
        
        {/* Visual Banner */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md mb-8">
          <img 
            src={ASSET_IMAGES.verificationBanner} 
            alt="Driving Licence Online Application Verification" 
            className="w-full h-44 object-cover"
          />
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Official Form</span>
              <h1 className="text-2xl font-black">Learner's Licence Application</h1>
            </div>
            {age !== null && (
              <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full ${isUnder18 ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-white'}`}>
                {isUnder18 ? 'Junior Applicant (16-18 Yrs)' : 'Standard Applicant (18+ Yrs)'}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Age-Route Notification */}
        {isUnder18 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl mb-6 shadow-sm">
            <h4 className="text-xs font-bold text-amber-900 uppercase">Minor Applicant Routing (16-18 Years)</h4>
            <p className="text-xs text-amber-800 mt-1">
              You are applying for a **Motorcycle Without Gear** Learner's Licence. Parental consent documentation is required.
            </p>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
          
          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">1. Personal & Guardian Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Applicant Full Name</label>
              <input 
                type="text" required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parent's / Guardian's Name</label>
              <input 
                type="text" required
                value={formData.parentName}
                onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
              <input 
                type="email" required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
              <input 
                type="tel" required maxLength={10}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date of Birth</label>
              <input 
                type="date" required
                value={formData.dob}
                onChange={handleDobChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 pt-4">2. Address & Identification</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State / UT</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-orange-500"
              >
                {INDIAN_STATES_AND_UTS.map((st, idx) => (
                  <option key={idx} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">City / District</label>
              <input 
                type="text" required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Aadhaar Number (12 Digit)</label>
              <input 
                type="text" required maxLength={12}
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Residential Address</label>
            <textarea 
              required rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 pt-4">3. Document Uploads (PDF / Images)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Birth Certificate Copy</label>
              <input 
                type="file" accept=".pdf,image/*" required
                onChange={(e) => setFormData({ ...formData, birthCert: e.target.files[0] })}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
              />
            </div>

            <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Aadhaar Card Copy</label>
              <input 
                type="file" accept=".pdf,image/*" required
                onChange={(e) => setFormData({ ...formData, aadhaarCopy: e.target.files[0] })}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
              />
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3 pt-4">4. Anti-Bot CAPTCHA Verification</h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl font-black bg-slate-900 text-amber-400 px-5 py-2.5 rounded-lg tracking-widest select-none">
                {captchaCode}
              </span>
              <button 
                type="button" 
                onClick={generateCaptcha} 
                className="text-xs font-bold text-orange-600 hover:underline"
              >
                🔄 Refresh
              </button>
            </div>
            <input 
              type="text" required
              placeholder="Enter Code"
              value={userCaptcha}
              onChange={(e) => setUserCaptcha(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-bold uppercase focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-4 rounded-xl text-base shadow-lg transition-transform active:scale-95 disabled:opacity-50 mt-6"
          >
            {loading ? 'Submitting Application...' : 'Submit Learner License Application'}
          </button>
        </form>
      </main>
    </div>
  );
}