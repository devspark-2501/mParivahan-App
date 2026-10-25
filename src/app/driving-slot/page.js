'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { INDIAN_GOVT_ASSETS } from '@/assets/assets';

export default function DrivingSlotPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [slotBooked, setSlotBooked] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-11-02');
  const [selectedTime, setSelectedTime] = useState('10:00 AM - 11:30 AM');

  // Check login & application eligibility on load
  useEffect(() => {
    const userSession = localStorage.getItem('mparivahan_user') || sessionStorage.getItem('mparivahan_token');
    
    if (!userSession) {
      alert('Authentication required! Please log in to view or schedule your driving test slot.');
      router.push('/auth/login?redirect=/driving-slot');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Checking RTO Test Eligibility...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-slate-950 px-3 py-1 rounded-full">
            Step 2 • Practical Track Test Scheduling
          </span>
          <h1 className="text-3xl font-black text-white">Schedule Practical Driving Test Slot</h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Book your mandatory physical vehicle evaluation slot at your assigned Regional Transport Office (RTO) automated test track.
          </p>
        </div>

        {/* Citizen & RTO Jurisdiction Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-4">
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              ELIGIBILITY VERIFIED • LL PASSED ✓
            </span>
            <h2 className="text-xl font-black text-slate-900">Registered RTO Facility Details</h2>
            
            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong>Applicant Reference:</strong> Citizen Registered Account</p>
              <p><strong>RTO Jurisdiction:</strong> Regional Transport Office, Central Zone (DL-01)</p>
              <p><strong>Test Track Location:</strong> Automated Driving Test Track, Burari Grounds, Delhi</p>
              <p><strong>Applicable Statutory Fee:</strong> ₹300 (Test Fee) + ₹200 (DL Smart Card Issuance)</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <img src={INDIAN_GOVT_ASSETS.rtoTestTrack} alt="Automated Test Track" className="w-full h-44 object-cover" />
          </div>
        </div>

        {/* Slot Selector Box */}
        {!slotBooked ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
            <h3 className="text-lg font-black text-slate-900 border-b pb-3 border-slate-200">
              Select Test Date & Time Slot
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Available Date</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                >
                  <option value="2026-11-02">Monday, 02 Nov 2026 (Slots Available)</option>
                  <option value="2026-11-03">Tuesday, 03 Nov 2026 (Slots Available)</option>
                  <option value="2026-11-05">Thursday, 05 Nov 2026 (Slots Available)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-2">Time Window</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                >
                  <option value="09:00 AM - 10:30 AM">09:00 AM - 10:30 AM</option>
                  <option value="10:00 AM - 11:30 AM">10:00 AM - 11:30 AM</option>
                  <option value="02:00 PM - 03:30 PM">02:00 PM - 03:30 PM</option>
                  <option value="04:00 PM - 05:30 PM">04:00 PM - 05:30 PM</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setSlotBooked(true)}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl text-sm shadow-xl transition active:scale-95"
            >
              Confirm & Book Practical Test Appointment →
            </button>
          </div>
        ) : (
          /* Confirmation State */
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <h2 className="text-2xl font-black text-slate-900">Appointment Confirmed!</h2>
            <p className="text-xs text-slate-600">
              Your practical driving test appointment has been scheduled successfully in Sarathi systems.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left space-y-2 text-xs">
              <p><strong>Appointment Date:</strong> {selectedDate}</p>
              <p><strong>Time Slot:</strong> {selectedTime}</p>
              <p><strong>Venue:</strong> RTO Central Automated Track, Burari Grounds</p>
              <p><strong>Requirements:</strong> Bring your own vehicle, Learner's Licence copy, and original Aadhaar card.</p>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="bg-slate-900 text-white text-xs font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition"
            >
              Go to User Dashboard →
            </button>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}