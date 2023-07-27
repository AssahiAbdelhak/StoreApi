import Fastify from "fastify";
import { fastifyPostgres } from "@fastify/postgres";
import dotenv from "dotenv";
import { getAllProducts } from "./database/getAllElements.js";

dotenv.config();
export const app = Fastify();

app.register(fastifyPostgres, {
    connectionString: `postgres://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@localhost/postgres`
  })
  

app.get('/', getAllProducts)


app.listen({port:3000})