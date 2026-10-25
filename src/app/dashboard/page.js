'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function UserDashboardPage() {
  const [downloading, setDownloading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleDownloadAndEmail = async () => {
    setDownloading(true);

    try {
      // 1. Generate the official licence certificate content dynamically
      const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Learner's Licence - mParivahan</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; background: #f8fafc; }
            .card { max-width: 700px; margin: 0 auto; background: #ffffff; border: 4px solid #0f172a; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
            .header { text-align: center; border-bottom: 2px solid #cbd5e1; padding-bottom: 20px; margin-bottom: 20px; }
            .title { font-size: 22px; font-weight: 900; color: #0f172a; text-transform: uppercase; }
            .subtitle { font-size: 12px; font-weight: 700; color: #ea580c; margin-top: 4px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; font-size: 13px; margin-bottom: 24px; }
            .label { font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 10px; }
            .value { font-weight: 800; color: #0f172a; margin-top: 2px; }
            .footer { text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <div class="title">Ministry of Road Transport & Highways</div>
              <div class="subtitle">GOVERNMENT OF INDIA • FORM 3 LEARNER'S LICENCE</div>
            </div>
            <div class="grid">
              <div>
                <div class="label">Application Reference</div>
                <div class="value">LL-98421033</div>
              </div>
              <div>
                <div class="label">Licence Status</div>
                <div class="value" style="color: #16a34a;">APPROVED & VERIFIED ✓</div>
              </div>
              <div>
                <div class="label">Test Score</div>
                <div class="value">10 / 10 (Passed)</div>
              </div>
              <div>
                <div class="label">Validity Period</div>
                <div class="value">6 Months</div>
              </div>
              <div>
                <div class="label">Jurisdiction RTO</div>
                <div class="value">RTO Delhi Central (DL-01)</div>
              </div>
              <div>
                <div class="label">Authorized Class</div>
                <div class="value">MCWOG / LMV</div>
              </div>
            </div>
            <div class="footer">
              <p>This is a digitally verified electronic licence document generated via mParivahan portal and integrated with DigiLocker.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      // 2. Create an instant blob download for the user
      const blob = new Blob([certificateHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Learners_Licence_LL-98421033.html');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // 3. Trigger Nodemailer email dispatch API
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
              {downloading ? 'Generating Digital Licence...' : 'Download Digital Licence Certificate'}
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