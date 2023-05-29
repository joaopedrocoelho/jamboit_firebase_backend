import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Game } from "./game.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  displayName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
  photo!: string;

  @Column({ nullable: false })
  refreshToken!: string;

  @OneToMany(() => Game, (game) => game.user_id, { onDelete: "CASCADE" })
  games: Game[];
}
