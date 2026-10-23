'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dl-services';

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, password })
      });

      if (res.ok) {
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTarget);
      } else {
        alert('Invalid Login Credentials');
      }
    } catch (err) {
      alert('Login Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />

      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">mParivahan Single Sign-On</span>
          <h2 className="text-2xl font-bold text-slate-900">Citizen Login</h2>
          <p className="text-xs text-slate-500">Log in with your registered mobile number to proceed with DL services.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
            <input 
              type="text" 
              required 
              placeholder="10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password / OTP</label>
            <input 
              type="password" 
              required 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-full text-sm shadow transition-all disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}