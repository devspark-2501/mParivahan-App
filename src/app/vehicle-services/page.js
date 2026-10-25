'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { INDIAN_GOVT_ASSETS, INDIAN_STATES_AND_UTS } from '@/assets/assets';
import { useLanguage } from '@/context/LanguageContext';

const sliderImages = [
  {
    url: INDIAN_GOVT_ASSETS.heroBannerBg,
    caption: "National Highway & Expressways Network",
    sub: "Automated Toll & Vahan Fastag Verification Infrastructure"
  },
  {
    url: INDIAN_GOVT_ASSETS.fourWheelerImg,
    caption: "Passenger Motor Vehicle Registration (LMV)",
    sub: "Instant Digital RC Generation via DigiLocker Integration"
  },
  {
    url: INDIAN_GOVT_ASSETS.commercialVehicleImg,
    caption: "Commercial Heavy Transport & Logistics",
    sub: "National Goods Permit & Commercial Vehicle Fitness Certification"
  },
  {
    url: INDIAN_GOVT_ASSETS.twoWheelerImg,
    caption: "Personal Two-Wheeler Mobility & EV Services",
    sub: "Green Tax Waivers & Electric Vehicle Registration Subsidy Portal"
  },
  {
    url: INDIAN_GOVT_ASSETS.rtoBuildingImg,
    caption: "Regional Transport Office (RTO) Hubs",
    sub: "Seamless Physical-to-Digital Vehicle Clearance Across 36 States & UTs"
  }
];

export default function VehicleServicesPage() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [rcNumber, setRcNumber] = useState('');
  const [chassisNo, setChassisNo] = useState('');
  const [selectedState, setSelectedState] = useState('Delhi');
  const [activeTab, setActiveTab] = useState('rcStatus');
  const [searchResult, setSearchResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-sliding effect every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleRcSearch = (e) => {
    e.preventDefault();
    if (!rcNumber || rcNumber.length < 5) {
      alert('Please enter a valid Registration Number (e.g. DL-01-AB-1234)');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSearchResult({
        regNo: rcNumber.toUpperCase(),
        ownerName: "RAHUL SHARMA",
        vehicleModel: "MARUTI SUZUKI SWIFT VXI (BS-VI)",
        regDate: "14-MAR-2022",
        fitnessValidUpTo: "13-MAR-2037",
        insuranceValidUpTo: "10-MAR-2027",
        puccValidUpTo: "12-DEC-2026",
        rtoOffice: `${selectedState} Central RTO (Zone 01)`,
        status: "ACTIVE / VERIFIED",
        hypothecation: "STATE BANK OF INDIA (ACTIVE)"
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      {/* Top Government Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <img src={INDIAN_GOVT_ASSETS.emblemOfIndia} alt="State Emblem" className="h-5 w-auto filter invert" />
            <span className="font-bold text-white">Vahan 4.0 Central Vehicle Registry</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">MoRTH Government of India Initiative</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-semibold text-amber-400">
            <span>High Security Registration Plate (HSRP) Compliant</span>
          </div>
        </div>
      </div>

      <main className="flex-grow space-y-12 pb-16">
        
        {/* HERO CAROUSEL SECTION */}
        <section className="relative w-full h-[520px] bg-slate-950 text-white overflow-hidden shadow-2xl">
          {/* Background Images with Automatic Fade Transition */}
          {sliderImages.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              } transform transition-transform duration-1000`}
            >
              <img
                src={slide.url}
                alt={slide.caption}
                className="w-full h-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
            </div>
          ))}

          {/* Hero Content Overlay */}
          <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-8 flex flex-col justify-center space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-600/90 text-white rounded-full text-xs font-black tracking-wider uppercase backdrop-blur-md w-fit shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              {t.vahanBadge || "● VAHAN 4.0 NATIONAL REGISTRY INTEGRATION"}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white max-w-3xl drop-shadow-lg">
              {t.vehicleServicesHeroTitle || "National Vehicle Registration & Vahan Services"}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed font-medium">
              {t.vehicleServicesHeroSubtitle || "Official digital gateway for Vehicle Registration (RC), Fitness Certificates, Ownership Transfer, Hypothecation Cancellation, and National Permit validation powered by Vahan 4.0."}
            </p>

            {/* Carousel Subtitle Caption Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-lg space-y-1">
              <p className="text-xs font-black text-orange-400 uppercase tracking-wide">
                Currently Displaying: {sliderImages[currentSlide].caption}
              </p>
              <p className="text-[11px] text-slate-300">
                {sliderImages[currentSlide].sub}
              </p>
            </div>

            {/* Slider Dots Indicator */}
            <div className="flex items-center gap-2 pt-2">
              {sliderImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentSlide(dotIdx)}
                  className={`h-2.5 rounded-full transition-all ${
                    dotIdx === currentSlide ? 'w-8 bg-orange-500' : 'w-2.5 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: LIVE RC SEARCH & STATUS LOOKUP WIDGET */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 border-slate-200 gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  REAL-TIME CITIZEN LOOKUP
                </span>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
                  Vahan Vehicle Verification Portal
                </h2>
              </div>

              {/* Tab Selector */}
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('rcStatus')}
                  className={`px-4 py-2 rounded-xl transition ${
                    activeTab === 'rcStatus' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Verify RC Status
                </button>
                <button
                  onClick={() => setActiveTab('roadTax')}
                  className={`px-4 py-2 rounded-xl transition ${
                    activeTab === 'roadTax' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Road Tax Calculator
                </button>
              </div>
            </div>

            {activeTab === 'rcStatus' ? (
              <form onSubmit={handleRcSearch} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Select State / UT *</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-orange-500"
                    >
                      {INDIAN_STATES_AND_UTS.map((st, i) => (
                        <option key={i} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Vehicle Registration No. *</label>
                    <input
                      type="text"
                      value={rcNumber}
                      onChange={(e) => setRcNumber(e.target.value)}
                      placeholder="e.g. DL01AB1234"
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-bold uppercase focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Chassis No. (Last 5 Digits)</label>
                    <input
                      type="text"
                      value={chassisNo}
                      onChange={(e) => setChassisNo(e.target.value)}
                      placeholder="e.g. 54321"
                      maxLength={5}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-bold uppercase focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-4 rounded-2xl text-sm shadow-xl transition active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Querying Vahan 4.0 Central Registry...' : 'Search Vehicle Registration Records →'}
                </button>
              </form>
            ) : (
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-4">
                <h3 className="text-sm font-black text-slate-900 uppercase">State Motor Vehicle Tax Estimator</h3>
                <p>Calculate road tax obligations based on vehicle class, fuel type (Petrol/Diesel/EV), purchase cost, and seating capacity.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Non-Transport Private Cars (LMV)</p>
                    <p className="text-slate-500 mt-1">One-time Lifetime Road Tax (15 Years): 8% to 12% of invoice price.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200">
                    <p className="font-bold text-slate-900">Electric Vehicles (EV Fleet)</p>
                    <p className="text-emerald-700 font-bold mt-1">100% Tax Waiver under National Clean Air Policy.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Search Result Display */}
            {searchResult && (
              <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 animate-in fade-in duration-300">
                <div className="flex flex-wrap items-center justify-between border-b pb-4 border-slate-800 gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                      OFFICIAL VAHAN RECORD FOUND
                    </span>
                    <h3 className="text-xl font-black text-white mt-2">{searchResult.regNo}</h3>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-white/10 px-3 py-1 rounded-xl">
                    {searchResult.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Registered Owner Name</p>
                    <p className="text-sm font-black text-white mt-1">{searchResult.ownerName}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Vehicle Maker & Class</p>
                    <p className="text-sm font-black text-white mt-1">{searchResult.vehicleModel}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">RTO Office Jurisdiction</p>
                    <p className="text-sm font-black text-white mt-1">{searchResult.rtoOffice}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Fitness Valid Up To</p>
                    <p className="text-sm font-black text-emerald-400 mt-1">{searchResult.fitnessValidUpTo}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Insurance Validity</p>
                    <p className="text-sm font-black text-emerald-400 mt-1">{searchResult.insuranceValidUpTo}</p>
                  </div>

                  <div>
                    <p className="text-slate-400 uppercase font-bold text-[10px]">Financier / Hypothecation</p>
                    <p className="text-sm font-black text-amber-400 mt-1">{searchResult.hypothecation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: CORE VAHAN SERVICES GRID */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {t.coreVehicleServicesTitle || "Core Vahan Citizen Services"}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {t.coreVehicleServicesSub || "Select a digital transport workflow below to initiate official government processing."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Ownership Transfer */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between hover:border-orange-500 transition-all group">
              <div className="space-y-4">
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-100">
                  <img src={INDIAN_GOVT_ASSETS.fourWheelerImg} alt="Vehicle Transfer" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded">
                  Form 29 & Form 30
                </span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition">
                  {t.serviceRcTransfer || "Transfer of Vehicle Ownership"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.serviceRcTransferDesc || "Apply for legal transfer of vehicle ownership (Form 29 & 30) upon sale, inheritance, or auction."}
                </p>
              </div>

              <Link href="/auth/login?redirect=/vehicle-services" className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition">
                Initiate Ownership Transfer →
              </Link>
            </div>

            {/* Card 2: Fitness Certificate */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between hover:border-orange-500 transition-all group">
              <div className="space-y-4">
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-100">
                  <img src={INDIAN_GOVT_ASSETS.commercialVehicleImg} alt="Fitness Certificate" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
                  Commercial & Transport FC
                </span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition">
                  {t.serviceRcFitness || "Vehicle Fitness Certificate (FC)"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.serviceRcFitnessDesc || "Schedule mandatory physical vehicle fitness evaluation for commercial and non-commercial transport."}
                </p>
              </div>

              <Link href="/driving-slot" className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition">
                Book Inspection Slot →
              </Link>
            </div>

            {/* Card 3: Hypothecation Termination */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-4 flex flex-col justify-between hover:border-orange-500 transition-all group">
              <div className="space-y-4">
                <div className="h-44 rounded-2xl overflow-hidden border border-slate-100">
                  <img src={INDIAN_GOVT_ASSETS.digitalSmartCard} alt="Hypothecation" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded">
                  Form 35 Bank Clearance
                </span>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition">
                  {t.serviceHypothecation || "Hypothecation (HPA / HPC)"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.serviceHypothecationDesc || "Add, endorse, or terminate bank loan hypothecation on vehicle Registration Certificates."}
                </p>
              </div>

              <Link href="/auth/login?redirect=/vehicle-services" className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs transition">
                Submit Form 35 Online →
              </Link>
            </div>

          </div>
        </section>

        {/* SECTION 4: GOVERNMENT INFRASTRUCTURE SHOWCASE */}
        <section className="bg-slate-950 text-white py-16 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest bg-orange-500 text-slate-950 px-3.5 py-1 rounded-full">
                NATIONAL TRANSPORT HIGHWAY INFRASTRUCTURE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Government of India Digital Mobility Ecosystem
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empowering over 300 million registered vehicle owners across India with instant electronic access, automated tolling, and unified inter-state connectivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <img src={INDIAN_GOVT_ASSETS.rtoBuildingImg} alt="RTO Headquarters" className="w-full h-48 object-cover rounded-2xl border border-slate-700" />
                <h3 className="text-base font-black text-white">Central RTO Digital Network</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  1,400+ Regional Transport Offices interconnected through NIC central databases for real-time verification and zero-paper handling.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <img src={INDIAN_GOVT_ASSETS.nicTechCenter} alt="NIC Data Center" className="w-full h-48 object-cover rounded-2xl border border-slate-700" />
                <h3 className="text-base font-black text-white">NIC Cloud Infrastructure</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  High-security cloud architecture maintained by National Informatics Centre ensuring 99.99% uptime for national citizen transport services.
                </p>
              </div>

              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <img src={INDIAN_GOVT_ASSETS.helpdeskSupport} alt="Helpline Support" className="w-full h-48 object-cover rounded-2xl border border-slate-700" />
                <h3 className="text-base font-black text-white">24/7 Citizen Helpdesk Support</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dedicated national toll-free support (1800-180-0151) aiding citizens with vehicle transfers, NOC clearances, and e-Challan disputes.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}