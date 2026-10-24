'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import { INDIAN_STATES_AND_UTS } from '@/assets/assets';

function SignupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dl-services';

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    aadhaar: '',
    state: 'Delhi',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.mobile.length !== 10) {
      alert('Mobile number must be exactly 10 digits.');
      return;
    }
    if (formData.aadhaar && formData.aadhaar.length !== 12) {
      alert('Aadhaar number must be exactly 12 digits.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTarget);
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Registration failed.');
      }
    } catch (err) {
      alert('Signup process failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          New Citizen Registration
        </span>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Create mParivahan Account</h2>
        <p className="text-xs text-slate-500">
          Register your official details to apply for Learner's Licence and track services.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name (As per Aadhaar)</label>
          <input 
            type="text"
            name="fullName"
            required 
            placeholder="e.g. Rahul Sharma"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number (10 Digit)</label>
            <input 
              type="tel"
              name="mobile"
              required 
              maxLength={10}
              placeholder="10-digit mobile"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State / UT</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {INDIAN_STATES_AND_UTS.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Aadhaar Number (12 Digit)</label>
          <input 
            type="text"
            name="aadhaar"
            maxLength={12}
            placeholder="Enter 12-digit Aadhaar number"
            value={formData.aadhaar}
            onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '') })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Security Password</label>
          <input 
            type="password"
            name="password"
            required 
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-sm shadow transition-all disabled:opacity-50 mt-2"
        >
          {loading ? 'Creating Account...' : 'Register Account'}
        </button>
      </form>

      <div className="text-center pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-600">
          Already have an account?{' '}
          <Link href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`} className="font-bold text-slate-900 hover:text-orange-600 underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Header />
      <Suspense fallback={<div className="text-center py-20 text-sm font-semibold text-slate-500">Loading Portal...</div>}>
        <SignupFormContent />
      </Suspense>
    </div>
  );
}