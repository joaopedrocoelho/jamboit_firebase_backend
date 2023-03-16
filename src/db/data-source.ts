import { DataSource } from "typeorm" 

import * as entities from "./entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.SUPABASE_DB_URL,
    username: "postgres",
    password: process.env.SUPABASE_DB_PASSWORD,
    port: 5432,
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [
        ...Object.values(entities)
    ],
    subscribers: [],
    migrations: [],
})