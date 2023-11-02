import express = require("express");
import cors from "cors";
import "express-async-errors";
import {rateLimit} from "express-rate-limit";

import {todoRouter} from "./routers/todo.ts";
import {handleError} from "./utils/errors.ts";
import {homeRouter} from "./routers/home.ts";


const app = express();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(limiter);

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/", homeRouter);
app.use(handleError);


app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on http://localhost:3001");
});
