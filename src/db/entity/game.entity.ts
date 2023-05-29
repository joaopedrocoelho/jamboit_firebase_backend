import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Question } from "./question.entity";
import { User } from "./user.entity";

@Entity()
export class Game {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user) => user.id)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Question, (question) => question.game, {
    onDelete: "CASCADE",
  })
  questions: Question[];
}
