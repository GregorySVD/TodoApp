import express = require("express");
import {pool} from "./utils/db";
import 'express-async-errors';

import {todoRouter} from "./routers/todo";
import './utils/db';
import {handleError, ValidationError} from "./utils/errors";

const app = express();

app.use(express.json());

app.use("/", todoRouter);
app.use(handleError);

app.get("/test", async (req, res) => {
    try {
        const [result] = await pool.execute("SELECT * FROM `todos`");
        res.json(result);
    } catch (err) {
        throw new ValidationError("wrong connection");
    }
})

app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on http://localhost:3001");
});
