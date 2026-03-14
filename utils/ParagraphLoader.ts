import { DURATION_TEXTS } from '../constants';

export const loadParagraphs = (mode: 'beginner' | 'intermediate' | 'advanced' | 'test', duration?: number): string => {
  if (mode === 'test' && duration) {
    let pool: string[] = [];
    if (duration <= 60) pool = DURATION_TEXTS.one_minute;
    else if (duration <= 300) pool = DURATION_TEXTS.five_minute;
    else pool = DURATION_TEXTS.ten_minute;
    
    const nextIndex = Math.floor(Math.random() * pool.length);
    return pool[nextIndex];
  }

  // Practice mode texts
  const practiceTexts = {
    beginner: [
      "The quick brown fox jumps over the lazy dog. It is a very sunny day outside and the birds are singing in the trees. We can go for a walk in the park and enjoy the fresh air.",
      "A journey of a thousand miles begins with a single step. You must always remember to keep moving forward, even when things get hard. Every small step you take brings you closer to your goal.",
      "To be or not to be, that is the question. Reading books is a great way to learn new things and expand your mind. You can travel to different worlds without ever leaving your room.",
      "All that glitters is not gold. It is important to look beyond the surface and see the true value of things. Sometimes the most precious things are hidden from plain sight."
    ],
    intermediate: [
      "Typing is a skill that requires practice and patience. The more you type, the faster and more accurate you will become. Try to focus on accuracy first, and speed will naturally follow.",
      "The internet has revolutionized the way we communicate and access information. With just a few clicks, we can connect with people all over the world and learn about almost any topic imaginable."
    ],
    advanced: [
      "In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.",
      "Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to the natural intelligence displayed by animals including humans. Leading AI textbooks define the field as the study of intelligent agents: any system that perceives its environment and takes actions that maximize its chance of achieving its goals."
    ]
  };

  const pool = practiceTexts[mode as keyof typeof practiceTexts] || practiceTexts.beginner;
  return pool[Math.floor(Math.random() * pool.length)];
};
