'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/dl-services';

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    aadhaar: '',
    state: 'Delhi',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
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
      alert('Signup process failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      <Header />

      <div className="max-w-lg mx-auto my-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            New Citizen Registration
          </span>
          <h2 className="text-2xl font-bold text-slate-900">Create mParivahan Account</h2>
          <p className="text-xs text-slate-500">
            Register your details to apply for Learner's Licence and manage vehicle services.
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
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mobile Number</label>
              <input 
                type="tel"
                name="mobile"
                required 
                maxLength={10}
                placeholder="10-digit mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">State / UT</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Aadhaar Number (Optional)</label>
            <input 
              type="text"
              name="aadhaar"
              maxLength={12}
              placeholder="12-digit Aadhaar number"
              value={formData.aadhaar}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
              <input 
                type="password"
                name="password"
                required 
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Confirm Password</label>
              <input 
                type="password"
                name="confirmPassword"
                required 
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full text-sm shadow transition-all disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Already have an account?{' '}
            <Link 
              href={`/auth/login?redirect=${encodeURIComponent(redirectTarget)}`}
              className="font-bold text-slate-900 hover:text-orange-600 underline"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}