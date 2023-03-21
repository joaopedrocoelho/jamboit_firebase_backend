import { Column, OneToMany, Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { Answer } from "./answer.entity";
import { Quiz } from "./quiz.entity";

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

    @ManyToOne(() => Quiz, quiz => quiz.questions)
    quiz: Quiz;

    @OneToMany(() => Answer, answer => answer.answer)
    answers: Answer[];

}