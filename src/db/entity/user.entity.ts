import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Game } from "./game.entity";

@Entity()
export class User {
  @PrimaryColumn("uuid")
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

  @OneToMany(() => Game, (game) => game.user, { onDelete: "CASCADE" })
  games: Game[];
}
