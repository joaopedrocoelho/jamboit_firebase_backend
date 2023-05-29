import { AppDataSource } from "../../express";
import { AnswerModel, GameModel, QuestionModel } from "../../models/game.model";
import { Answer } from "../entity/answer.entity";
import { Game } from "../entity/game.entity";
import { Question } from "../entity/question.entity";
import { User } from "../entity/user.entity";

export interface GameDao<TGame, YQuestion, UAnswer> {
  getGameById(id: string): Promise<TGame>;
  getGamesByUserId(userId: string): Promise<TGame[]>;
  createGame(game: GameModel, user: User): Promise<TGame>;
  addQuestion(question: QuestionModel, game: TGame): Promise<YQuestion>;
  addAnswer(answer: AnswerModel, question: YQuestion): Promise<UAnswer>;
}

export const typeORMGameDao: GameDao<Game, Question, Answer> = {
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
  addAnswer: async (
    answer: AnswerModel,
    question: Question
  ): Promise<Answer> => {
    const newAnswer = new Answer();
    newAnswer.answer = answer.answer;
    newAnswer.question = question;

    return await AppDataSource.getRepository(Answer).save(newAnswer);
  },
  addQuestion: async (
    question: QuestionModel,
    game: Game
  ): Promise<Question> => {
    const newQuestion = new Question();
    newQuestion.question = question.question;
    newQuestion.score = question.score;
    newQuestion.correct_answer = question.correct_answer;
    newQuestion.game = game;
    newQuestion.answers = [];
    for (let i = 0; i < question.answers.length; i++) {
      const answer = await typeORMGameDao.addAnswer(
        question.answers[i],
        newQuestion
      );
      newQuestion.answers.push(answer);
    }
    return await AppDataSource.getRepository(Question).save(newQuestion);
  },
  createGame: async (game: GameModel, user: User): Promise<Game> => {
    const newGame = new Game();
    newGame.user = user;
    newGame.name = game.name;
    for (let i = 0; i < game.questions.length; i++) {
      const question = await typeORMGameDao.addQuestion(
        game.questions[i],
        newGame
      );
      newGame.questions.push(question);
    }

    return await AppDataSource.getRepository(Game).save(game);
  },
};
