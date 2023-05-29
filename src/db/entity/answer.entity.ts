import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
  @PrimaryColumn()
  id!: number;

  @PrimaryColumn()
  question_id!: number;

  @Column()
  answer!: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
  })
  question: Question;
}
