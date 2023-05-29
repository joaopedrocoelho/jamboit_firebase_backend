export interface GameModel {
  name: string;
  questions: QuestionModel[];
}

export interface QuestionModel {
  index: number;
  question: string;
  score: number;
  correct_answer: number;
  answers: AnswerModel[];
}

export interface AnswerModel {
  index: number;
  answer: string;
}

export const mockGame: GameModel = {
  name: "Chinese History Quiz",
  questions: [
    {
      index: 1,
      score: 100,
      question:
        "Which Chinese dynasty is known for building the Great Wall of China?",
      answers: [
        {
          index: 1,
          answer: "Tang Dynasty",
        },
        {
          index: 2,
          answer: "Ming Dynasty",
        },
        {
          index: 3,
          answer: "Qing Dynasty",
        },
        {
          index: 4,
          answer: "Song Dynasty",
        },
        {
          index: 5,
          answer: "Han Dynasty",
        },
      ],
      correct_answer: 2,
    },
    {
      index: 2,
      score: 100,
      question:
        "Who was the founder of the People's Republic of China in 1949?",
      answers: [
        {
          index: 1,
          answer: "Mao Zedong",
        },
        {
          index: 2,
          answer: "Deng Xiaoping",
        },
        {
          index: 3,
          answer: "Chiang Kai-shek",
        },
        {
          index: 4,
          answer: "Sun Yat-sen",
        },
      ],
      correct_answer: 1,
    },
    {
      index: 3,
      score: 100,
      question:
        "Which Chinese philosopher wrote the famous book 'The Art of War'?",
      answers: [
        {
          index: 1,
          answer: "Laozi",
        },
        {
          index: 2,
          answer: "Mozi",
        },
        {
          index: 3,
          answer: "Confucius",
        },
        {
          index: 4,
          answer: "Sun Tzu",
        },
      ],
      correct_answer: 4,
    },
    {
      index: 4,
      score: 100,
      question: "Which event marked the end of Imperial China in 1912?",
      answers: [
        {
          index: 1,
          answer: "Opium Wars",
        },
        {
          index: 2,
          answer: "Taiping Rebellion",
        },
        {
          index: 3,
          answer: "Xinhai Revolution",
        },
        {
          index: 4,
          answer: "Boxer Rebellion",
        },
      ],
      correct_answer: 3,
    },
    {
      index: 5,
      score: 100,
      question:
        "Which city was the ancient capital of China during the Tang Dynasty?",
      answers: [
        {
          index: 1,
          answer: "Beijing",
        },
        {
          index: 2,
          answer: "Xi'an",
        },
        {
          index: 3,
          answer: "Shanghai",
        },
        {
          index: 4,
          answer: "Hangzhou",
        },
      ],
      correct_answer: 2,
    },
  ],
};

// {
//   index: "q6",
//   question:
//     "Which Chinese philosopher is known for his teachings on filial piety?",
//   answers: [
//     {
//       index: "q6a1",
//       answer: "Laozi",
//     },
//     {
//       index: "q6a2",
//       answer: "Mozi",
//     },
//     {
//       index: "q6a3",
//       answer: "Confucius",
//     },
//     {
//       index: "q6a4",
//       answer: "Sun Tzu",
//     },
//   ],
//   correctAnswer: "q6a3",
// },
// {
//   index: "q7",
//   question:
//     "Who was the last imperial dynasty of China that ruled from 1644 to 1912?",
//   answers: [
//     {
//       index: "q7a1",
//       answer: "Ming Dynasty",
//     },
//     {
//       index: "q7a2",
//       answer: "Qing Dynasty",
//     },
//     {
//       index: "q7a3",
//       answer: "Han Dynasty",
//     },
//     {
//       index: "q7a4",
//       answer: "Song Dynasty",
//     },
//   ],
//   correctAnswer: "q7a2",
// },
// {
//   index: "q8",
//   question:
//     "Which Chinese revolutionary leader is known as the 'Father of Modern China'?",
//   answers: [
//     {
//       index: "q8a1",
//       answer: "Mao Zedong",
//     },
//     {
//       index: "q8a2",
//       answer: "Deng Xiaoping",
//     },
//     {
//       index: "q8a3",
//       answer: "Sun Yat-sen",
//     },
//     {
//       index: "q8a4",
//       answer: "Chiang Kai-shek",
//     },
//   ],
//   correctAnswer: "q8a3",
// },
// {
//   index: "q9",
//   question:
//     "Which Chinese dynasty is known for its maritime expeditions led by Admiral Zheng He?",
//   answers: [
//     {
//       index: "q9a1",
//       answer: "Tang Dynasty",
//     },
//     {
//       index: "q9a2",
//       answer: "Ming Dynasty",
//     },
//     {
//       index: "q9a3",
//       answer: "Qing Dynasty",
//     },
//     {
//       index: "q9a4",
//       answer: "Song Dynasty",
//     },
//   ],
//   correctAnswer: "q9a2",
// },
// {
//   index: "q10",
//   question: "Who is consindexered the first emperor of a unified China?",
//   answers: [
//     {
//       index: "q10a1",
//       answer: "Mao Zedong",
//     },
//     {
//       index: "q10a2",
//       answer: "Deng Xiaoping",
//     },
//     {
//       index: "q10a3",
//       answer: "Chiang Kai-shek",
//     },
//     {
//       index: "q10a4",
//       answer: "Qin Shi Huang",
//     },
//   ],
//   correctAnswer: "q10a4",
// },
// {
//   index: "q11",
//   question:
//     "What was the main goal of the Hundred Flowers Campaign in the People's Republic of China?",
//   answers: [
//     {
//       index: "q11a1",
//       answer: "To promote Chinese culture and arts",
//     },
//     {
//       index: "q11a2",
//       answer: "To encourage intellectual freedom and criticism",
//     },
//     {
//       index: "q11a3",
//       answer: "To modernize China's agriculture",
//     },
//     {
//       index: "q11a4",
//       answer: "To strengthen China's military power",
//     },
//   ],
//   correctAnswer: "q11a2",
// },
// {
//   index: "q12",
//   question:
//     "Which famous Chinese female ruler is known for her role in the Tang Dynasty's golden age?",
//   answers: [
//     {
//       index: "q12a1",
//       answer: "Empress Dowager Cixi",
//     },
//     {
//       index: "q12a2",
//       answer: "Wu Zetian",
//     },
//     {
//       index: "q12a3",
//       answer: "Empress Xiaozhuang",
//     },
//     {
//       index: "q12a4",
//       answer: "Empress Matilda",
//     },
//   ],
//   correctAnswer: "q12a2",
// },
// {
//   index: "q13",
//   question: "Who is known as the 'Father of Chinese Communism'?",
//   answers: [
//     {
//       index: "q13a1",
//       answer: "Mao Zedong",
//     },
//     {
//       index: "q13a2",
//       answer: "Deng Xiaoping",
//     },
//     {
//       index: "q13a3",
//       answer: "Chiang Kai-shek",
//     },
//     {
//       index: "q13a4",
//       answer: "Sun Yat-sen",
//     },
//   ],
//   correctAnswer: "q13a1",
// },
// {
//   index: "q14",
//   question:
//     "Which Chinese dynasty is known for its porcelain production, including blue and white porcelain?",
//   answers: [
//     {
//       index: "q14a1",
//       answer: "Tang Dynasty",
//     },
//     {
//       index: "q14a2",
//       answer: "Ming Dynasty",
//     },
//     {
//       index: "q14a3",
//       answer: "Qing Dynasty",
//     },
//     {
//       index: "q14a4",
//       answer: "Song Dynasty",
//     },
//   ],
//   correctAnswer: "q14a2",
// },
// {
//   index: "q15",
//   question:
//     "Which major protest movement took place in Beijing's Tiananmen Square in 1989?",
//   answers: [
//     {
//       index: "q15a1",
//       answer: "May Fourth Movement",
//     },
//     {
//       index: "q15a2",
//       answer: "Boxer Rebellion",
//     },
//     {
//       index: "q15a3",
//       answer: "Cultural Revolution",
//     },
//     {
//       index: "q15a4",
//       answer: "Tiananmen Square protests",
//     },
//   ],
//   correctAnswer: "q15a4",
// },
