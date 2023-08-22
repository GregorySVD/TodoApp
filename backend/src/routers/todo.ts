import {Router} from "express";
import {TodoRecord} from "../../records/todo.record.ts";
import {ValidationError} from "../utils/errors.ts";

export const todoRouter = Router();


todoRouter
    .get("/", async (req, res) => {
        try {
            const result = await TodoRecord.ListAll();
            res.json(result);
        } catch (err) {
            throw new ValidationError("List of gifts cannot be found, please try again later");
        }
    })
    .get("/:id", async (req, res) => {
        try {
            const result = await TodoRecord.getOne(req.params.id);
            if (result === null) {
                res.status(404).json({error: `Task with id ${req.params.id} does not exist`});
            } else {
                res.json(result);
            }

        } catch (err) {
            throw new ValidationError("Task with given id");
        }
    });
