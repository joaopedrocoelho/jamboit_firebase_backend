import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
  @PrimaryColumn()
  index: number;

  @Column()
  answer!: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "CASCADE",
  })
  question: Question;
}
