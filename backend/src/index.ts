import express from "express";
import cors from "cors";
import "express-async-errors";
import { DBENV } from "./utils/dbConfig";

import { todoRouter } from "./routers/todo";
import { handleError } from "./utils/errors";
import { homeRouter } from "./routers/home";
import { todoPostgresRouter } from "./routers/todo-postgres";

const app = express();

const allowedOrigins = ["https://app-todo-fe.vercel.app", "http://localhost:3000", "https://app-todo-fe.vercel.app/"];

app.use;
cors({
  origin: (origin, callback) => {
    console.log("Checking origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
});

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/postgres", todoPostgresRouter);
app.use("/", homeRouter);
app.use(handleError);

app.listen(DBENV.POSTGRES_PORT, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${DBENV.POSTGRES_PORT}`);
});

export default app;
