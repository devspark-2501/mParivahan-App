'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const rtoQuestions = [
  {
    id: 1,
    question: "What should you do when you see a flashing red traffic light?",
    options: ["Stop completely and proceed when safe", "Slow down and proceed with caution", "Speed up to clear the intersection", "Ignore and keep driving"],
    answer: 0,
  },
  {
    id: 2,
    question: "What does a triangular traffic sign indicate?",
    options: ["Mandatory instruction", "Informatory sign", "Give Way / Caution sign", "Speed limit"],
    answer: 2,
  },
  {
    id: 3,
    question: "When overtaking a vehicle ahead, from which side should you pass?",
    options: ["From the left side", "From the right side", "From either side depending on space", "From the footpath side"],
    answer: 1,
  },
  {
    id: 4,
    question: "What is the mandatory minimum age for driving a motorcycle with gear in India?",
    options: ["16 years", "18 years", "21 years", "20 years"],
    answer: 1,
  },
  {
    id: 5,
    question: "What does a continuous yellow line painted on the road mean?",
    options: ["You can cross to overtake freely", "No overtaking across the line", "Parking is allowed", "Pedestrian crossing only"],
    answer: 1,
  },
  {
    id: 6,
    question: "While driving, mobile phone usage is:",
    options: ["Allowed only with hands-free kits", "Strictly prohibited", "Allowed in emergencies", "Allowed on highways"],
    answer: 1,
  },
  {
    id: 7,
    question: "What should you do when approaching an un-guarded railway crossing?",
    options: ["Stop your vehicle, look both ways, then cross", "Honk loudly and cross quickly", "Speed up to cross before a train arrives", "Follow the car ahead without stopping"],
    answer: 0,
  },
  {
    id: 8,
    question: "What does a blue circular sign with a white arrow pointing left mean?",
    options: ["Turn left mandatory / Keep left", "Left turn prohibited", "Parking on left", "Dead end ahead"],
    answer: 0,
  },
  {
    id: 9,
    question: "Is it mandatory to wear a helmet while riding a two-wheeler?",
    options: ["Only for the driver", "Only on national highways", "Mandatory for both driver and pillion rider", "Not mandatory in city limits"],
    answer: 2,
  },
  {
    id: 10,
    question: "What document must every driver carry while operating a motor vehicle?",
    options: ["Driving Licence, RC, and Insurance", "Only Aadhaar Card", "Only PUC Certificate", "Voter ID card"],
    answer: 0,
  },
];

export default function AdmissionTestPage() {
  const router = useRouter();
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedTest, setSubmittedTest] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: optionIndex });
  };

  const handleNext = () => {
    if (currentQ < rtoQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    let correctCount = 0;
    rtoQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmittedTest(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      <Header />

      <main className="flex-grow max-w-2xl w-full mx-auto px-4 py-10 space-y-6">
        
        {!submittedTest ? (
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl space-y-6">
            <div className="flex justify-between items-center border-b pb-4 border-slate-200">
              <span className="text-xs font-bold uppercase text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                Official RTO Online Screening Test
              </span>
              <span className="text-xs font-mono font-bold text-slate-500">
                Question {currentQ + 1} of {rtoQuestions.length}
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-black text-slate-900">
                {rtoQuestions[currentQ].question}
              </h2>

              <div className="space-y-3 pt-2">
                {rtoQuestions[currentQ].options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQ] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'border-orange-500 bg-orange-50 text-orange-950 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                      }`}
                    >
                      <span>{option}</span>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${isSelected ? 'bg-orange-600 border-orange-600 text-white font-bold' : 'border-slate-300'}`}>
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                disabled={currentQ === 0}
                onClick={() => setCurrentQ(currentQ - 1)}
                className="text-xs font-bold text-slate-500 disabled:opacity-30"
              >
                ← Previous
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQ] === undefined}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md transition disabled:opacity-50"
              >
                {currentQ === rtoQuestions.length - 1 ? 'Finish & Submit Test →' : 'Next Question →'}
              </button>
            </div>
          </div>
        ) : (
          /* Test Results Screen */
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xl text-center space-y-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl font-black ${score >= 6 ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {score >= 6 ? '✓' : '✕'}
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">
                {score >= 6 ? 'Test Passed Successfully!' : 'Test Failed. Please Try Again.'}
              </h2>
              <p className="text-xs text-slate-600">
                You scored <strong className="text-slate-900 font-bold">{score} / 10</strong> correct answers. 
                {score >= 6 ? ' Required passing score is 6.' : ' You need at least 6 correct answers to pass.'}
              </p>
            </div>

            {score >= 6 ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition"
              >
                Go to User Dashboard & Get Licence Copy →
              </button>
            ) : (
              <button
                onClick={() => { setSubmittedTest(false); setCurrentQ(0); setSelectedAnswers({}); }}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl text-xs shadow-md transition"
              >
                Retake Test
              </button>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}