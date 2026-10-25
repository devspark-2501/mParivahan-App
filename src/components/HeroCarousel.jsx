'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const slideImages = [
  '/Home_Phtotos/image_one.jpeg',
  '/Home_Phtotos/image_two.jpeg',
  '/Home_Phtotos/image_three.jpeg',
  '/Home_Phtotos/image_four.jpeg',
  '/Home_Phtotos/image_five.jpeg'
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slideImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentSlideText = t.slides[active] || t.slides[0];

  return (
    <section className="relative w-full h-[540px] bg-slate-900 overflow-hidden">
      {/* Background Slides */}
      {slideImages.map((imgSrc, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === active ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-1000`}
        >
          <img
            src={imgSrc}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
        </div>
      ))}

      {/* Hero Content Block */}
      <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center z-10">
        <div className="max-w-2xl text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-600/90 text-white rounded-md text-xs font-bold tracking-wide uppercase backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {currentSlideText.subtitle}
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {currentSlideText.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed drop-shadow">
            {currentSlideText.desc}
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href="/apply-ll">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm px-7 py-3.5 rounded-md shadow-lg transition-transform active:scale-95">
                {t.applyBtn}
              </button>
            </Link>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm px-7 py-3.5 rounded-md backdrop-blur-md transition-colors">
              {t.exploreBtn}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}