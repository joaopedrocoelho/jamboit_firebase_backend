import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @OneToMany(() => Question, (question) => question.game)
  questions: Question[];
}
