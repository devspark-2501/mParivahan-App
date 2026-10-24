'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dl-services';

  const [step, setStep] = useState(1); // Step 1: Mobile Input, Step 2: OTP Verification
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Send WhatsApp OTP handler
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      // Simulate generating a random 6-digit OTP
      const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockOtp);
      setLoading(false);
      setStep(2);
      alert(`[WhatsApp Gateway Simulation] Your mParivahan verification OTP is: ${mockOtp}`);
    }, 1000);
  };

  // Verify OTP and Login
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter the complete 6-digit OTP.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password: otp })
      });

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTarget);
      } else {
        // Fallback for demo if user hasn't registered yet in MongoDB
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTarget);
      }
    } catch (err) {
      localStorage.setItem('isLoggedIn', 'true');
      router.push(redirectTarget);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-14 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      
      {/* Header Info with clean vertical spacing / padding */}
      <div className="text-center space-y-3">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-orange-700 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
          mParivahan Single Sign-On
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight pt-1">
          {step === 1 ? 'Citizen Login via WhatsApp' : 'Verify 6-Digit OTP'}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          {step === 1 
            ? 'Enter your registered mobile number to receive an instant WhatsApp verification code.'
            : `We have sent a 6-digit security code via WhatsApp to +91 ${mobile}`}
        </p>
      </div>

      {step === 1 ? (
        /* Step 1: Mobile Number Form */
        <form onSubmit={handleSendOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-sm font-bold text-slate-500">+91</span>
              <input 
                type="tel" 
                required 
                maxLength={10}
                placeholder="Enter 10-digit number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Sending WhatsApp OTP...' : 'Send WhatsApp OTP →'}
          </button>
        </form>
      ) : (
        /* Step 2: 6-Digit OTP Verification Form */
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Enter 6-Digit WhatsApp OTP
            </label>
            <input 
              type="text" 
              required 
              maxLength={6}
              placeholder="1 2 3 4 5 6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center tracking-[0.5em] text-lg font-black px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            <div className="flex justify-between items-center mt-2 text-xs">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-orange-600 font-semibold hover:underline"
              >
                ← Change Number
              </button>
              <span className="text-slate-400">Didn't receive? <button type="button" onClick={() => alert(`Resent OTP: ${generatedOtp}`)} className="text-slate-700 font-bold underline">Resend</button></span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
        </form>
      )}

      {/* Footer Register Link */}
      <div className="text-center pt-4 border-t border-slate-100 space-y-2">
        <p className="text-xs text-slate-600">
          Don't have an mParivahan account?{' '}
          <Link 
            href={`/auth/signup?redirect=${encodeURIComponent(redirectTarget)}`}
            className="font-bold text-orange-600 hover:text-orange-700 underline"
          >
            Register Now
          </Link>
        </p>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Header />
      <Suspense fallback={<div className="text-center py-20 text-sm font-semibold text-slate-500">Loading Login Portal...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}