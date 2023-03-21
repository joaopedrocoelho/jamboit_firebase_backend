import { Column,Entity, ManyToOne } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
    @Column()
    answer!: string;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;
}