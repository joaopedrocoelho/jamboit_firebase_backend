import {
  Column,
  OneToMany,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Answer } from "./answer.entity";
import { Game } from "./game.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  score: number;

  @Column()
  correct_answer: number;

  @ManyToOne(() => Game, (game) => game.questions)
  game: Game;

  @OneToMany(() => Answer, (answer) => answer.answer)
  answers: Answer[];
}
