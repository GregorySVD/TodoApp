import express from "express";
import cors from "cors";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import { DBENV } from "./dbConfig";

import { todoRouter } from "./src/routers/todo";
import { handleError } from "./src/utils/errors";
import { homeRouter } from "./src/routers/home";
import { todoPostgresRouter } from "./src/routers/todo-postgres";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(limiter);

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/postgres", todoPostgresRouter);
app.use("/", homeRouter);
app.use(handleError);

app.listen(DBENV.POSTGRES_PORT, "0.0.0.0", () => {
  console.log(`Listening on http://localhost:${DBENV.POSTGRES_PORT}`);
});
