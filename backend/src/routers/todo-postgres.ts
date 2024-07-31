import { Request, Response, Router } from "express";
import { TodoRecord } from "../records/todo.record";
import { ValidationError } from "../utils/errors";
import { PostgresTodoRecord } from "../records/postgres.todo.record";

export const todoPostgresRouter = Router();

todoPostgresRouter
  .get("/", async (req: Request, res: Response) => {
    try {
      const result = await PostgresTodoRecord.ListAllPostgres();
      res.json(result);
    } catch (err) {
      throw new ValidationError("List of tasks cannot be found, please try again later");
    }
  })

  .delete("/", async (req: Request, res: Response) => {
    try {
      await PostgresTodoRecord.deleteAllTodosPostgres();
    } catch (err) {
      throw new ValidationError(err.message);
    }
    res.end();
  })
  .delete("/:id", async (req: Request, res: Response) => {})

  .get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await PostgresTodoRecord.getOneTodoPostgres(req.params.id);
      if (!result) {
        res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
      } else {
        res.json(result);
      }
    } catch (err) {
      throw new ValidationError("Task with given id does not exist");
    }
  })
  .post("/", async (req: Request, res: Response) => {
    try {
      const newTask = new PostgresTodoRecord(req.body);
      await newTask.insertNewTodoPostgres();
      res.json(newTask);
    } catch (err) {
      throw new ValidationError("Cannot insert task with given id");
    }
  });
