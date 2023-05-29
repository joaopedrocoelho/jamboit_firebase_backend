export interface GameModel {
  user_id: string;
  name: string;
  created_at: Date;
  questions: QuestionModel[];
}

export interface QuestionModel {
  id: number;
  question: string;
  score: number;
  correct_answer: number;
  answers: AnswerModel[];
}

export interface AnswerModel {
  id: number;
  answer: string;
}
