
import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import TypingArea from '../components/TypingArea';
import { EXAM_MODES, DURATION_TEXTS } from '../constants';
import { TypingStats, ExamConfig } from '../types';

const ExamMode: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedExam, setSelectedExam] = useState<ExamConfig | null>(null);
  const [isExamRunning, setIsExamRunning] = useState(false);
  const [targetText, setTargetText] = useState('');
  const lastTextIndex = useRef<number>(-1);

  const getRandomTextForDuration = (d: number) => {
    let pool: string[] = [];
    if (d <= 60) pool = DURATION_TEXTS.one_minute;
    else if (d <= 300) pool = DURATION_TEXTS.five_minute;
    else pool = DURATION_TEXTS.ten_minute;
    
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
      }
    }
  }, [searchParams]);

  const handleSelectExam = (exam: ExamConfig) => {
    setSelectedExam(exam);
    setSearchParams({ type: exam.id });
  };

  const handleStartExam = () => {
    if (selectedExam) {
      setTargetText(getRandomTextForDuration(selectedExam.duration));
      setIsExamRunning(true);
    }
  };

  const handleExit = () => {
    setIsExamRunning(false);
    setSelectedExam(null);
    setSearchParams({});
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <SEO 
        title="Government Exam Simulation - SSC & Banking Typing Mocks" 
        description="Simulate real government typing exams like SSC CHSL, CGL, and Banking. Practice with strict accuracy norms and official WPM calculation methods." 
      />

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Exam Simulation Center</h1>
        <p className="text-slate-500">Choose your target exam to start a simulated typing test with official rules.</p>
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
            <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
            onFinish={(stats) => console.log('Exam Finished', stats)}
            showHighlight={selectedExam?.highlightEnabled}
            allowBackspace={selectedExam?.backspaceAllowed}
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
    </div>
  );
};

export default ExamMode;
