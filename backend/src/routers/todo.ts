import {Request, Response, Router} from "express";
import {TodoRecord} from "../../records/todo.record.ts";
import {ValidationError} from "../utils/errors.ts";

export const todoRouter = Router();


todoRouter
    .get("/", async (req: Request, res: Response) => {
        try {
            const result = await TodoRecord.ListAll();
            res.json(result);
        } catch (err) {
            throw new ValidationError("List of tasks cannot be found, please try again later");
        }
    })
    .get("/:id", async (req: Request, res: Response) => {
        try {
            const result = await TodoRecord.getOne(req.params.id);
            if (!result) {
                res.status(404).json({error: `Task with id ${req.params.id} does not exist`});
            } else {
                res.json(result);
            }

        } catch (err) {
            throw new ValidationError("Task with given id");
        }
    })
    .delete("/:id", async (req: Request, res: Response) => {
        try {
            const task = await TodoRecord.getOne(req.params.id);
            if (!task) {
                throw new ValidationError("Task with given id not found");
            }
            await task.delete();
            res.end();
        } catch (e) {
            throw new ValidationError("Cannot delete task with given id");
        }
    })
    .post("/", async (req: Request, res: Response) => {
        try {
            const newTask = new TodoRecord(req.body);
            await console.log(newTask);
            await newTask.insert();
            res.json(newTask);
        } catch (e) {
            throw new ValidationError("Cannot insert task with given id");
        }

    })
    .patch("/switch/:id", async (req: Request, res: Response) => {
        const task = await TodoRecord.getOne(req.params.id);
        if (!task) {
            throw new ValidationError("Task with given id not found");
        }
        try {
            await task.switchIsDoneState();
            res.json({isDone: task.isDone});
        } catch (err) {
            res.status(500).json({error: `Error updating todo with id ${req.params.id}, try again later`});
        }

        res.end();
    });
