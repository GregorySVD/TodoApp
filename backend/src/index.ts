import express = require("express");
import {todoRouter} from "./routers/todo";
import {pool} from "./utils/db";

const app = express();

app.use(express.json());

app.use('/', todoRouter);

app.get('/test', async (req, res) => {
    try {
        const [result] = await pool.execute("SELECT * FROM `todos`");
        res.json(result);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({message: "Server error"});
    }
})

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3001');
});
