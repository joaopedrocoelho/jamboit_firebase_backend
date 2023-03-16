import { DataSource } from "typeorm" 
import { User } from "./entity/user.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: 'db.rrdqwzhupxsikfvbvfvz.supabase.co',
    username: "postgres",
    password: "YhNqgxdbCDlKxviU",
    port: 5432,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [
        User
    ],
    subscribers: [],
    migrations: [],
})