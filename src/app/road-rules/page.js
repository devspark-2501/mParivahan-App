'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const quizQuestions = [
  {
    q: "What action must you take when facing a solid RED traffic light?",
    options: ["Slow down and proceed with caution", "Stop completely before the stop line", "Honk and turn left immediately", "Speed up to clear the junction"],
    ans: 1,
    explanation: "A solid Red light means an absolute stop behind the stop line until the signal turns green."
  },
  {
    q: "What does a steady YELLOW light indicate?",
    options: ["Accelerate quickly", "Clear the intersection or prepare to stop safely", "Park your vehicle", "Pedestrians must cross"],
    ans: 1,
    explanation: "Yellow indicates the signal is changing to Red. Stop if safe to do so; otherwise, clear the intersection."
  },
  {
    q: "When approaching an unmarked pedestrian zebra crossing, drivers should:",
    options: ["Maintain speed", "Give way and allow pedestrians to cross safely", "Flash high beams to clear pedestrians", "Use continuous horn"],
    ans: 1,
    explanation: "Pedestrians have right-of-way at designated Zebra Crossings."
  },
  {
    q: "What is the legal blood alcohol limit while operating a motor vehicle in India?",
    options: ["30mg per 100ml blood", "50mg per 100ml blood", "100mg per 100ml blood", "No limit on highway"],
    ans: 0,
    explanation: "Under Section 185 of MV Act 1988, driving with blood alcohol exceeding 30mg/100ml is a punishable offense."
  },
  {
    q: "From which side must you legally overtake a vehicle ahead?",
    options: ["From the left side", "From the right side", "Any side with open gap", "From the kerb side"],
    ans: 1,
    explanation: "Overtaking must always be performed on the right side of the vehicle ahead."
  }
];

export default function RoadRulesPage() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qIdx, oIdx) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: oIdx });
  };

  const getScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.ans) score++;
    });
    return score;
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8 space-y-10">
        
        {/* Banner */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl space-y-3">
          <span className="text-[10px] font-black uppercase tracking-wider bg-orange-500 text-slate-950 px-3 py-1 rounded-full">
            Citizen Education • MV Act Guidelines
          </span>
          <h1 className="text-3xl font-black text-white">Road Rules & Traffic Regulations</h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Learn mandatory traffic light signals, lane discipline rules, and test your knowledge with our interactive rule practice module.
          </p>
        </div>

        {/* Section 1: Traffic Lights Guide */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          <h2 className="text-xl font-black text-slate-900 border-b pb-3 border-slate-200">
            🚦 Traffic Signal Indicators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Red Light */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 space-y-3">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                🔴
              </div>
              <h3 className="text-base font-black text-red-950">STOP (Red Light)</h3>
              <p className="text-xs text-red-800 leading-relaxed">
                Complete stop behind the stop line. Turning left on red is only permitted where explicitly indicated by signs.
              </p>
            </div>

            {/* Yellow Light */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-3">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                🟡
              </div>
              <h3 className="text-base font-black text-amber-950">CAUTION (Yellow Light)</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Prepare to stop safely. If you have already crossed the stop line when yellow turns on, clear the junction carefully.
              </p>
            </div>

            {/* Green Light */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl shadow-md">
                🟢
              </div>
              <h3 className="text-base font-black text-emerald-950">PROCEED (Green Light)</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Proceed through the intersection if the path is clear. Always check for pedestrians clearing zebra crossings.
              </p>
            </div>

          </div>
        </div>

        {/* Section 2: Interactive Practice Quiz */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-8">
          <div className="flex justify-between items-center border-b pb-4 border-slate-200">
            <div>
              <h2 className="text-xl font-black text-slate-900">🎮 Road Safety Knowledge Game</h2>
              <p className="text-xs text-slate-500">Select the correct option for each question to test your knowledge.</p>
            </div>
            {showResults && (
              <span className="text-xs font-black bg-orange-100 text-orange-700 px-3 py-1.5 rounded-xl border border-orange-200">
                Score: {getScore()} / {quizQuestions.length}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {quizQuestions.map((q, idx) => (
              <div key={idx} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <p className="text-sm font-black text-slate-900">
                  {idx + 1}. {q.q}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[idx] === oIdx;
                    const isCorrect = q.ans === oIdx;
                    
                    let style = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
                    if (isSelected) style = "bg-orange-50 border-orange-500 text-orange-950 font-bold";
                    if (showResults) {
                      if (isCorrect) style = "bg-emerald-100 border-emerald-500 text-emerald-950 font-bold";
                      else if (isSelected) style = "bg-red-100 border-red-500 text-red-950 font-bold";
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelect(idx, oIdx)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition-all ${style}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {showResults && (
                  <p className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 font-medium">
                    ℹ️ <strong>Explanation:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowResults(!showResults)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl text-xs shadow-lg transition"
          >
            {showResults ? 'Hide Results / Retry Quiz' : 'Check Quiz Answers →'}
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}