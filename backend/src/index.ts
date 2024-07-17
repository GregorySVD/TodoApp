import express from "express";
import cors from "cors";
import "express-async-errors";
import { rateLimit } from "express-rate-limit";
import { DBENV } from "./utils/dbConfig";

import { todoRouter } from "./routers/todo";
import { handleError } from "./utils/errors";
import { homeRouter } from "./routers/home";
import { todoPostgresRouter } from "./routers/todo-postgres";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use(
  cors({
    origin: "https://todoapp-sand.vercel.app/",
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

export default app;
