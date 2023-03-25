import { Column,Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";

@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    answer!: string;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;
}