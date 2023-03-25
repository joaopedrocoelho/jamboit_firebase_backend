import 'reflect-metadata';
import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { routes } from "./routes";
import { DataSource } from 'typeorm';
import { entities } from "./db/entity/index";



if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config({ path: '.env.development' });
}

//TODO move this to another file and make it work
export const AppDataSource= new DataSource({
  type: "postgres",
  host: process.env.SUPABASE_DB_URL,
  username: "postgres",
  password: process.env.SUPABASE_DB_PASSWORD,
  port: parseInt(process.env.SUPABASE_DB_PORT),
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: entities,
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize().then(() => {
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
  }));

  app.use(express.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }

    next();
  });

  routes(app);

  console.log("Server is running on port 3000");
   app.listen("3000", async () => {

    app.get("/", (req, res) => {
      res.send("<h1>Hello!</h1>");

    });

  })
});

