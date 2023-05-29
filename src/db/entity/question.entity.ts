import {
  Column,
  OneToMany,
  Entity,
  PrimaryColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Answer } from "./answer.entity";
import { Game } from "./game.entity";

@Entity()
export class Question {
  @PrimaryColumn()
  id!: number;

  @Column()
  question!: string;

  @Column()
  score!: number;

  @Column()
  correct_answer!: number;

  @ManyToOne(() => Game, (game) => game.questions)
  game: Game;

  @OneToMany(() => Answer, (answer) => answer.answer, { onDelete: "CASCADE" })
  answers: Answer[];
}
