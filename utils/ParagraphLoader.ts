import { DURATION_TEXTS, PRACTICE_TEXTS } from '../constants';

export const loadParagraphs = (mode: 'beginner' | 'intermediate' | 'advanced' | 'test' | 'easy' | 'hard' | 'beginners' | 'numbers' | 'paragraph', duration?: number): string => {
  if (mode === 'test' && duration) {
    let pool: string[] = [];
    if (duration <= 30) pool = DURATION_TEXTS.thirty_second;
    else if (duration <= 45) pool = DURATION_TEXTS.forty_five_second;
    else if (duration <= 60) pool = DURATION_TEXTS.one_minute;
    else if (duration <= 90) pool = DURATION_TEXTS.ninety_second;
    else if (duration <= 120) pool = DURATION_TEXTS.two_minute;
    else if (duration <= 300) pool = DURATION_TEXTS.five_minute;
    else pool = DURATION_TEXTS.ten_minute;
    
    const nextIndex = Math.floor(Math.random() * pool.length);
    return pool[nextIndex];
  }

  if (mode === 'easy') return DURATION_TEXTS.easy[Math.floor(Math.random() * DURATION_TEXTS.easy.length)];
  if (mode === 'hard') return DURATION_TEXTS.hard[Math.floor(Math.random() * DURATION_TEXTS.hard.length)];
  if (mode === 'beginners') return DURATION_TEXTS.beginners[Math.floor(Math.random() * DURATION_TEXTS.beginners.length)];
  if (mode === 'numbers') return DURATION_TEXTS.numbers[Math.floor(Math.random() * DURATION_TEXTS.numbers.length)];
  if (mode === 'paragraph') return DURATION_TEXTS.ten_minute[Math.floor(Math.random() * DURATION_TEXTS.ten_minute.length)];

  // Practice mode texts
  const pool = PRACTICE_TEXTS[mode as keyof typeof PRACTICE_TEXTS] || PRACTICE_TEXTS.beginner;
  return pool[Math.floor(Math.random() * pool.length)];
};
