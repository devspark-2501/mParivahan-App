'use client';

import React, { useState, useEffect } from 'react';

const slides = [
  {
    image: '/Home_Phtotos/image_one.jpeg',
    badge: 'ACCESSIBLE DRIVING SERVICES',
    title: 'Making Driving Licence Services Simple & Transparent',
    description: 'A beginner-friendly portal engineered for first-time applicants across India.'
  },
  {
    image: '/Home_Phtotos/image_two.jpeg',
    badge: 'LEARNER\'S LICENCE (LL)',
    title: 'Apply & Take Your LL Test Right From Home',
    description: 'Prepare with interactive traffic sign quizzes and schedule test slots seamlessly.'
  },
  {
    image: '/Home_Phtotos/image_three.jpeg',
    badge: 'PERMANENT DL TRACKING',
    title: 'End-to-End Live Application Status',
    description: 'Track your application status from document verification to physical card delivery.'
  },
  {
    image: '/Home_Phtotos/image_four.jpeg',
    badge: 'DIGILOCKER INTEGRATION',
    title: 'Instant Access to Your Official Digital DL & RC',
    description: 'Legally valid digital documents delivered directly to your mobile device.'
  },
  {
    image: '/Home_Phtotos/image_five.jpeg',
    badge: 'MULTILINGUAL & INCLUSIVE',
    title: 'Empowering Every Citizen in Their Regional Language',
    description: 'Guided workflows built for low digital literacy and all skill levels.'
  }
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Rotates every 3 seconds
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[520px] bg-slate-950 overflow-hidden shadow-2xl">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-1000`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent" />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="relative max-w-7xl mx-auto h-full px-6 lg:px-8 flex items-center z-10">
        <div className="max-w-2xl text-white space-y-5">
          <span className="inline-block px-3.5 py-1 text-xs font-bold tracking-wider bg-purple-600 text-white rounded-full uppercase shadow-lg">
            {slides[currentSlide].badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg text-slate-200 font-normal leading-relaxed drop-shadow">
            {slides[currentSlide].description}
          </p>
          
          <div className="pt-2 flex flex-wrap gap-4">
            <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3 rounded-full shadow-lg transition-transform active:scale-95">
              Apply for Learner's Licence
            </button>
            <button className="bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 font-semibold px-7 py-3 rounded-full transition-all">
              Practice Mock Test
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}