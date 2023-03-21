import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    displayName!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    photo!: string; 

    @Column({ nullable: false })
    refreshToken!: string;  
}