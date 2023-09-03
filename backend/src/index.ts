import express = require("express");
import "express-async-errors";

import {todoRouter} from "./routers/todo.ts";
import {handleError} from "./utils/errors.ts";
import {homeRouter} from "./routers/home.ts";

const app = express();

app.use(express.json());

app.use("/todo", todoRouter);
app.use("/", homeRouter);
app.use(handleError);


app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on http://localhost:3001");
});
