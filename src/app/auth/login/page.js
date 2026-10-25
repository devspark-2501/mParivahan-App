'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { INDIAN_GOVT_ASSETS } from '@/assets/assets';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dashboard';

  const [step, setStep] = useState(1); // 1 = Email Input | 2 = OTP Verification
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Request Email OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2);
      } else {
        alert(data.message || 'Failed to send verification email.');
      }
    } catch (err) {
      alert('Network error while requesting OTP.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Email OTP & Redirect
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.trim().length === 0) {
      alert('Please enter the verification code sent to your email.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otp.trim() }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save session keys so auth guards recognize active login
        localStorage.setItem('mparivahan_user', JSON.stringify({ email }));
        localStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('mparivahan_token', 'active_session_token');
        
        // Push router to the requested redirect target (e.g. /apply-ll)
        router.push(redirectTarget);
      } else {
        alert(data.message || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      alert('Verification failed due to network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
      
      {/* Portal Branding Header */}
      <div className="text-center space-y-2">
        <span className="text-[10px] font-black uppercase tracking-wider bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
          MPARIVAHAN SINGLE SIGN-ON
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          {step === 1 ? 'Citizen Secure Login' : 'Verify Email Code'}
        </h2>
        <p className="text-xs text-slate-500">
          {step === 1 
            ? 'Enter your registered email to receive a secure authentication OTP.' 
            : `We have sent a 6-digit verification code to ${email}`}
        </p>
      </div>

      {step === 1 ? (
        /* Step 1 Form: Email Input */
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="citizen@example.com"
              className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl text-sm shadow-xl transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Sending Secure OTP...' : 'Get Login OTP →'}
          </button>
        </form>
      ) : (
        /* Step 2 Form: OTP Verification (No Debug Banner) */
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2 text-center">
              ENTER 6-DIGIT SECURITY CODE
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-center text-xl font-mono font-black tracking-widest focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-slate-500 hover:underline font-medium"
            >
              ← Change Email
            </button>
            <button
              type="button"
              onClick={handleRequestOtp}
              className="text-orange-600 font-bold hover:underline"
            >
              Resend Code
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl text-sm shadow-xl transition active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Verifying Session...' : 'Verify & Sign In →'}
          </button>
        </form>
      )}

      <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
        Don't have an mParivahan account?{' '}
        <Link href="/auth/register" className="text-orange-600 font-bold hover:underline">
          Register New Account
        </Link>
      </div>

    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <Suspense fallback={<div className="text-xs font-bold text-slate-500">Loading Login Portal...</div>}>
          <LoginFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}