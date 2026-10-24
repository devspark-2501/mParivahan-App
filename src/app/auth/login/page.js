'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dl-services';

  const [step, setStep] = useState(1); // Step 1: Mobile Input | Step 2: 6-Digit OTP Verification
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [devHintOtp, setDevHintOtp] = useState('');

  // Step 1: Request WhatsApp OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const data = await res.json();

      if (res.ok) {
        setDevHintOtp(data.devOtp || '');
        setStep(2);
      } else {
        alert(data.message || 'Failed to send WhatsApp OTP.');
      }
    } catch (err) {
      alert('Network error while requesting WhatsApp OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify WhatsApp OTP & Authenticate
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert('Please enter the complete 6-digit verification code.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTarget);
      } else {
        alert(data.message || 'Invalid OTP code. Please try again.');
      }
    } catch (err) {
      alert('Verification process failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      
      {/* Header Info */}
      <div className="text-center space-y-3">
        <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-orange-700 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200 shadow-sm">
          mParivahan Single Sign-On
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight pt-1">
          {step === 1 ? 'Citizen Login via WhatsApp' : 'Enter 6-Digit WhatsApp OTP'}
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
          {step === 1 
            ? 'Enter your registered mobile number to receive an instant verification code on WhatsApp.'
            : `We have sent a 6-digit security code via WhatsApp to +91 ${mobile}`}
        </p>
      </div>

      {step === 1 ? (
        /* Step 1: Request OTP Form */
        <form onSubmit={handleRequestOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              Registered Mobile Number
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
                className="w-full pl-14 pr-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
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
        /* Step 2: OTP Verification Form */
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
              6-Digit Verification Code
            </label>
            <input 
              type="text" 
              required 
              maxLength={6}
              placeholder="1 2 3 4 5 6"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center tracking-[0.5em] text-lg font-black px-4 py-3.5 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50 transition-all"
            />

            {/* Hackathon Demo Helper Box */}
            {devHintOtp && (
              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-center shadow-sm">
                <p className="text-[11px] font-bold text-amber-900">
                  💡 [Hackathon Demo OTP]:{' '}
                  <span className="font-mono text-xs font-black tracking-wider bg-white px-2 py-0.5 rounded border border-amber-300 text-amber-700">
                    {devHintOtp}
                  </span>
                </p>
              </div>
            )}

            <div className="flex justify-between items-center mt-3 text-xs">
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="text-orange-600 font-bold hover:underline"
              >
                ← Change Mobile Number
              </button>
              <button 
                type="button" 
                onClick={() => alert(`Resent WhatsApp OTP: ${devHintOtp}`)} 
                className="text-slate-500 font-semibold hover:text-slate-800 underline"
              >
                Resend Code
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Verifying Credentials...' : 'Verify & Sign In'}
          </button>
        </form>
      )}

      {/* Signup Redirection Link */}
      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-600">
          Don't have an mParivahan account?{' '}
          <Link 
            href={`/auth/signup?redirect=${encodeURIComponent(redirectTarget)}`}
            className="font-bold text-orange-600 hover:text-orange-700 underline"
          >
            Register New Account
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
      <Suspense fallback={<div className="text-center py-20 text-sm font-semibold text-slate-500">Loading Portal...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}