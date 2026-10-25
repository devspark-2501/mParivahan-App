'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function UserDashboardPage() {
  const [downloading, setDownloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Handles fetching /card (or /card.pdf) from public folder & triggering browser download
  const handleDownloadAndEmail = async () => {
    setDownloading(true);

    try {
      // 1. Trigger client-side file download from public folder (/card)
      const link = document.createElement('a');
      link.href = '/card'; // Direct path to public/card file
      link.setAttribute('download', 'Learners_Licence_LL-98421033.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2. Trigger email dispatch API to send email copy to the user
      const userSession = localStorage.getItem('mparivahan_user');
      const userEmail = userSession ? JSON.parse(userSession).email : 'applicant@mparivahan.gov.in';

      const response = await fetch('/api/send-licence-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          applicationNo: 'LL-98421033',
        }),
      });

      if (response.ok) {
        setEmailSent(true);
      }
    } catch (error) {
      console.error('Error downloading licence file:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-4xl w-full mx-auto px-4 py-10 space-y-6">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">
              Verified Citizen Profile
            </span>
            <h1 className="text-2xl font-black tracking-tight">Welcome, Citizen Applicant</h1>
            <p className="text-xs text-slate-300">mParivahan Digital Identity & Driving Licence Portfolio</p>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20 text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400">Status</p>
            <p className="text-sm font-black text-emerald-400">Test Passed ✓</p>
          </div>
        </div>

        {/* Email Notification Alert */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-start gap-4 shadow-sm">
          <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black shrink-0">
            ✉
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-black text-emerald-950">Licence Copy Dispatched via Email</h2>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Your Learner's Licence approval and digital document copy have been successfully dispatched to your registered email address via Nodemailer. You can also download your digital DL certificate below.
            </p>
            {emailSent && (
              <p className="text-[11px] text-emerald-700 font-bold pt-1">
                ✓ Confirmation email triggered to your inbox!
              </p>
            )}
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase">Licence Details</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Application Ref:</strong> LL-98421033</p>
              <p><strong>Test Result:</strong> Passed (10/10)</p>
              <p><strong>Validity:</strong> 6 Months (Learner's Licence)</p>
            </div>
            <button 
              onClick={handleDownloadAndEmail}
              disabled={downloading}
              className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold hover:bg-slate-800 transition active:scale-95 disabled:opacity-50"
            >
              {downloading ? 'Fetching Digital Licence...' : 'Download Digital Licence (PDF)'}
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase">Quick Actions</h3>
            <div className="space-y-2">
              <Link href="/apply-ll" className="block text-center w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-xl text-xs font-bold transition">
                Apply for Permanent DL →
              </Link>
              <Link href="/" className="block text-center w-full bg-orange-50 hover:bg-orange-100 text-orange-700 py-3 rounded-xl text-xs font-bold transition border border-orange-200">
                Return to Home Portal
              </Link>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}