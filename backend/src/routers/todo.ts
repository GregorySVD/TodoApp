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
            throw new ValidationError("List of gifts cannot be found, please try again later");
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
        const task = await TodoRecord.getOne(req.params.id);
        if (!task) {
            throw new ValidationError("Task with given id not found");
        }
        await task.delete();
        res.end();
    })
    .post("/", async (req: Request, res: Response) => {
        const newTask = new TodoRecord({
            description: "TEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEST",
            title: "ETTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEFFAT",
        });
        await newTask.insert();
        res.json(newTask);
    })
    .patch("/done/:id", async (req: Request, res: Response) => {
        const task = await TodoRecord.getOne(req.params.id);
        if (!task) {
            throw new ValidationError("Task with given id not found");
        }
        try {
            await task.markItDone();
        } catch (err) {
            res.status(500).json({error: `Error updating todo with id ${req.params.id}, try again later`});
        }
        res.end();
    })
    .patch("/undone/:id", async (req: Request, res: Response) => {
        const task = await TodoRecord.getOne(req.params.id);
        if (!task) {
            throw new ValidationError("Task with given id not found");
        }
        try {
            await task.markItUnDone();
        } catch (err) {
            res.status(500).json({error: `Error updating todo with id ${req.params.id}, try again later`});
        }
        res.end();
    });
