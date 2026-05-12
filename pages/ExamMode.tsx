
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import TypingLinksSection from '../components/TypingLinksSection';
import PageSEOContent from '../components/PageSEOContent';
import Breadcrumbs from '../components/Breadcrumbs';
import { EXAM_MODES, EXAM_TEXTS } from '../constants';
import { TypingStats, ExamConfig } from '../types';

const ExamMode: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [selectedExam, setSelectedExam] = useState<ExamConfig | null>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [targetText, setTargetText] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const lastTextIndex = useRef<number>(-1);

  const getRandomTextForMode = (examId: string) => {
    const pool = EXAM_TEXTS[examId] || EXAM_TEXTS['ssc-chsl'];
    
    let nextIndex = Math.floor(Math.random() * pool.length);
    if (pool.length > 1 && nextIndex === lastTextIndex.current) {
      nextIndex = (nextIndex + 1) % pool.length;
    }
    lastTextIndex.current = nextIndex;
    return pool[nextIndex];
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      const exam = EXAM_MODES.find(e => e.id === type);
      if (exam) {
        setSelectedExam(exam);
        setIsExamRunning(false);
        setResetKey(prev => prev + 1);
      }
    }
  }, [searchParams]);

  const handleSelectExam = (exam: ExamConfig) => {
    setSelectedExam(exam);
    setSearchParams({ type: exam.id });
  };

  const handleStartExam = () => {
    if (selectedExam) {
      setTargetText(getRandomTextForMode(selectedExam.id));
      setIsExamRunning(true);
      setResetKey(prev => prev + 1);
    }
  };

  const handleExit = () => {
    setIsExamRunning(false);
    setSelectedExam(null);
    setSearchParams({});
    setResetKey(prev => prev + 1);
  };

  const handleExamFinish = useCallback((stats: TypingStats) => {
    console.log('Exam Finished', stats);
  }, []);

  const getSEOData = () => {
    if (location.pathname.includes('ssc-typing-test-practice')) {
      return {
        title: "SSC Typing Test Practice — Exam Preparation",
        description: "SSC typing test practice for government exam preparation. Practice at official exam speed requirements.",
        canonicalPath: "/exam-mode"
      };
    }
    return {
      title: "Typing Exam Mode — Govt Exam Practice Online",
      description: "Practice typing in exam simulation mode. Prepare for government typing exams with timed practice.",
      canonicalPath: "/exam-mode"
    };
  };

  const getDisplayContent = () => {
    if (location.pathname.includes('ssc-typing-test-practice')) {
      return {
        h1: "SSC Typing Test Practice — Government Exam Preparation",
        p: "Prepare for SSC and other government competitive exam typing tests. Practice at the required speed and accuracy level to clear your official typing examination."
      };
    }
    return {
      h1: "Professional Exam Typing Simulation",
      p: "Prepare for your final skill test with our ssc cgl typing test practice module and other government exam simulations. We provide official mock interfaces for SSC, Banking, Court Clerk, and Data Entry Operator (DEO) exams."
    };
  };

  const seo = getSEOData();
  const displayContent = getDisplayContent();

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title={seo.title} 
        description={seo.description}
        canonicalPath={seo.canonicalPath}
      />

      <Breadcrumbs />

      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-2">{displayContent.h1}</h1>
        <p className="text-xl text-slate-500 max-w-2xl">
          {displayContent.p}
        </p>
      </div>

      {!isExamRunning ? (
        <div className="space-y-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAM_MODES.map((exam) => (
              <div 
                key={exam.id} 
                onClick={() => handleSelectExam(exam)}
                className={`bg-white border-2 p-6 rounded-2xl shadow-sm transition-all cursor-pointer ${
                  selectedExam?.id === exam.id 
                    ? 'border-blue-600 ring-4 ring-blue-50' 
                    : 'border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{exam.name}</h3>
                  {selectedExam?.id === exam.id && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">SELECTED</span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mb-4 h-12">{exam.description}</p>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <span className="flex items-center gap-1">⏱️ {exam.duration / 60}m</span>
                  <span className="flex items-center gap-1">⌨️ Backspace: {exam.backspaceAllowed ? 'On' : 'Off'}</span>
                </div>
              </div>
            ))}
          </div>

          {selectedExam && (
            <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-8">
              <div className="text-center max-w-2xl">
                <h4 className="text-xl font-bold text-slate-900 mb-2">Exam Structure: What to Expect</h4>
                <p className="text-slate-600 mb-6">
                  Yes, real government skill tests (like the SSC DEST, Bank Clerk, and Court exams) consist <strong>entirely</strong> of a single, continuous paragraph typing task. There are no mini-games, lessons, or multiple-choice questions. You will be evaluated purely on your ability to type the provided official text accurately within the fixed duration.
                </p>
                <div className="bg-white p-4 rounded-xl text-left border border-slate-100 flex flex-col md:flex-row gap-6 justify-center">
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                    <span className="font-medium text-slate-900">{selectedExam.duration / 60} Minutes</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Backspace</span>
                    <span className="font-medium text-slate-900">{selectedExam.backspaceAllowed ? 'Allowed' : 'Disabled'}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Highlighting</span>
                    <span className="font-medium text-slate-900">{selectedExam.highlightEnabled ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleStartExam}
                className="bg-slate-900 text-white px-12 py-4 rounded-xl font-bold text-xl hover:bg-slate-800 transition-all shadow-xl"
              >
                Launch {selectedExam.name}
              </button>
              <p className="text-sm text-slate-400">Official exam rules will be applied automatically.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <p><strong>Strict Mode Active:</strong> You are practicing for <strong>{selectedExam?.name}</strong>. {selectedExam?.highlightEnabled ? 'Word highlighting is enabled.' : 'Word highlighting is disabled as per official exam norms.'}</p>
          </div>
          
          <TypingArea 
            key={selectedExam?.id}
            targetText={targetText}
            duration={selectedExam?.duration || 600}
            onFinish={handleExamFinish}
            showHighlight={selectedExam?.highlightEnabled}
            allowBackspace={selectedExam?.backspaceAllowed}
            mode={selectedExam?.id || 'exam'}
            resetKey={resetKey}
          />

          <div className="flex justify-center pt-8">
            <button 
              onClick={handleExit}
              className="bg-slate-100 text-slate-600 px-6 py-2 rounded-lg font-medium hover:bg-slate-200 transition-all"
            >
              Exit Exam Simulation
            </button>
          </div>
        </div>
      )}

      <section className="mt-20 border-t border-slate-100 pt-16">
        <div className="prose prose-slate max-w-none">
          <h2 className="text-3xl font-black text-slate-900 mb-6 font-black">Preparing for SSC CGL Typing Test Practice</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            The Staff Selection Commission Skill Test is highly rigorous. Our <strong>ssc cgl typing test practice</strong> arena replicates the exact constraints you will face in the examination hall, including disabling the backspace key (where applicable) and forcing a 15-minute endurance run.
          </p>
          <div className="grid md:grid-cols-2 gap-12 not-prose mt-10">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
               <h3 className="text-xl font-bold text-slate-900 mb-4">Official Accuracy Norms</h3>
               <p className="text-slate-500 text-sm leading-relaxed">Most government exams allow only a small percentage of errors (usually 5-7% for general category). Our simulation tracks your net WPM and counts backspaces as time-effort, helping you align with official scoring standards.</p>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
               <h3 className="text-xl font-bold text-slate-900 mb-4">Recommended Practice Routine</h3>
               <p className="text-slate-500 text-sm leading-relaxed">Spend at least 30 minutes daily on this page. Alternate between CHSL and CGL mocks to handle different word densities and formatting styles effectively.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Practice by Exam Type
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/ssc-typing-test-practice" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 font-medium text-slate-700 text-sm">
            SSC CGL / CHSL Practice →
          </Link>
          <Link to="/rrb-typing-test-practice" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 font-medium text-slate-700 text-sm">
            RRB NTPC Practice →
          </Link>
          <Link to="/ibps-typing-test-practice" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 font-medium text-slate-700 text-sm">
            IBPS Clerk Practice →
          </Link>
          <Link to="/sbi-typing-test-practice" className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 font-medium text-slate-700 text-sm">
            SBI Clerk Practice →
          </Link>
        </div>
      </section>

      <PageSEOContent 
        topic="Government Typing Exam Simulator"
        offers="Simulate the exact environment of competitive government skill tests, strictly adhering to official rules."
        steps={[
          "Select your specific target exam format from the choices above.",
          "Read the specific rules (e.g. backspace disabled) for that tier.",
          "Type the provided mock paragraph within the rigid time limit.",
          "Review your net WPM accuracy formatted exactly like the real scorecards."
        ]}
        benefits={[
          "Eliminates dependency on visual crutches (highlighting, easy corrections).",
          "Condition your nerves to test-stress before entering the examination hall.",
          "Familiarize yourself with the exact length and complex vocabulary used by SSC / IBPS."
        ]}
        relatedPath="/lessons/advanced"
        relatedName="Advanced Speed Drills"
      />

      <TypingLinksSection />
    </div>
  );
};

export default ExamMode;
