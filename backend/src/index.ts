import express = require("express");
import {todoRouter} from "./routers/todo";

const app = express();

app.use(express.json());

app.use('/', todoRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
