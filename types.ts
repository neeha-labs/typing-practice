
export interface TypingStats {
  wpm: number;
  accuracy: number;
  totalChars: number;
  correctChars: number;
  errors: number;
  timeSpent: number;
}

export enum TestDuration {
  ONE_MINUTE = 60,
  TWO_MINUTES = 120,
  FIVE_MINUTES = 300,
  TEN_MINUTES = 600,
  FIFTEEN_MINUTES = 900
}

export interface ExamConfig {
  id: string;
  name: string;
  duration: number;
  backspaceAllowed: boolean;
  highlightEnabled: boolean;
  description: string;
}

export interface CharacterStatus {
  char: string;
  status: 'pending' | 'correct' | 'incorrect';
}
