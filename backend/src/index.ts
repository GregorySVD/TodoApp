import express = require("express");
import "express-async-errors";

import {todoRouter} from "./routers/todo.ts";
import {handleError} from "./utils/errors.ts";
import {TodoRecord} from "../records/todo.record.ts";

const app = express();

app.use(express.json());

app.use("/", todoRouter);
app.use(handleError);

app.get("/test", async (req, res) => {
    try {
        const result = await TodoRecord.ListAll();
        res.json(result);
    } catch (err) {
        console.log(err);
        //@TODO: fix  ValidationError
    }
})
app.get('/test/:id', async (req, res) => {
    try {
        const result = await TodoRecord.getOne(req.params.id);
        res.json(result);
    } catch (err) {
        console.log(err);
    }
})

app.listen(3001, "0.0.0.0", () => {
    console.log("Listening on http://localhost:3001");
});
