import express from "express";
import cors, { CorsOptions } from "cors";
import "express-async-errors";
import { DBENV } from "./utils/dbConfig";

import { todoRouter } from "./routers/todo";
import { handleError } from "./utils/errors";
import { homeRouter } from "./routers/home";
import { todoPostgresRouter } from "./routers/todo-postgres";

const app = express();

const allowedOrigins = ["http://localhost:3000", "https://todoapp-sand.vercel.app"];

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (allowedOrigins.indexOf(origin || "") !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/postgres", todoPostgresRouter);
app.use("/", homeRouter);
app.use(handleError);

app.listen(DBENV.POSTGRES_PORT, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${DBENV.POSTGRES_PORT}`);
});

export default app;
