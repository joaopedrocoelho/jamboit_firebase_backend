import { AppDataSource } from "../../express";
import { AnswerModel, GameModel, QuestionModel } from "../../models/game.model";
import { Answer } from "../entity/answer.entity";
import { Game } from "../entity/game.entity";
import { Question } from "../entity/question.entity";
import { User } from "../entity/user.entity";

export interface GameDao<T> {
  getGameById(id: string): Promise<T>;
  getGamesByUserId(userId: string): Promise<T[]>;
  createGame(game: GameModel): Promise<T>;
}

export const typeORMGameDao: GameDao<Game> = {
  getGameById: async (id: string): Promise<Game> => {
    return await AppDataSource.getRepository(Game)
      .createQueryBuilder("game")
      .where("game.id = :id", { id: id })
      .getOne();
  },
  getGamesByUserId: async (userId: string): Promise<Game[]> => {
    return await AppDataSource.getRepository(Game)
      .createQueryBuilder("game")
      .where("game.user_id = :userId", { userId: userId })
      .getMany();
  },
  createGame: async (game: GameModel): Promise<Game> => {
    const newGame = new Game();
    newGame.name = game.name;
    newGame.user_id = game.user_id;
    newGame.questions = game.questions;

    return await AppDataSource.getRepository(Game).save(game);
  },
};

export interface QuestionDao<T> {
  addQuestions(questions: QuestionModel[]): Promise<T[]>;
  getQuestionsByGameId(gameId: string): Promise<T[]>;
}

export const typeORMQuestionDao: QuestionDao<Question> = {
  addQuestions: async (questions: QuestionModel[]): Promise<Question[]> => {
    const newQuestions = questions.map((question) => {
      const newQuestion = new Question();
      newQuestion.question = question.question;
      newQuestion.score = question.score;
      newQuestion.correct_answer = question.correct_answer;
      typeORMAnswerDao.addAnswers(question.answers);
      //newQuestion.answers = question.answers;
      return newQuestion;
    });
    return await AppDataSource.getRepository(Question).save(newQuestions);
  },
  getQuestionsByGameId: async (gameId: string): Promise<Question[]> => {
    return await AppDataSource.getRepository(Question)
      .createQueryBuilder("question")
      .where("question.game_id = :gameId", { gameId: gameId })
      .getMany();
  },
};

export interface AnswerDao<T> {
  addAnswers(answers: AnswerModel[]): Promise<T[]>;
  getAnswersByQuestionId(questionId: number): Promise<T[]>;
}

export const typeORMAnswerDao: AnswerDao<Answer> = {
  addAnswers: async (answers: AnswerModel[]): Promise<Answer[]> => {
    const newAnswers = answers.map((answer) => {
      const newAnswer = new Answer();
      newAnswer.answer = answer.answer;
      return newAnswer;
    });
    return await AppDataSource.getRepository(Answer).save(newAnswers);
  },
  getAnswersByQuestionId: async (questionId: number): Promise<Answer[]> => {
    return await AppDataSource.getRepository(Answer)
      .createQueryBuilder("answer")
      .where("answer.question_id = :questionId", { questionId: questionId })
      .getMany();
  },
};
