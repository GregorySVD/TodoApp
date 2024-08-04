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

  .delete("/done", async (req, res) => {
    try {
      const result = await PostgresTodoRecord.DeleteAllDoneTodosPostgres();

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "No tasks found to delete." });
      }
      res.status(204).end();
    } catch (e) {
      res.status(500).json({ error: "Cannot delete these tasks, try again later" });
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const task = await PostgresTodoRecord.getOneTodoPostgres(req.params.id);
      if (!task) {
        return res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
      }
      await task.deleteSelectedTodo();
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: "Cannot delete task with given id, try again later" });
    }
  })

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
  })
  .patch("/switch/:id", async (req: Request, res: Response) => {
    const task = await PostgresTodoRecord.getOneTodoPostgres(req.params.id);
    if (!task) {
      res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
    }
    try {
      await task.switchIsDoneStatePostgres();
      res.json({ is_done: task.is_done });
    } catch (err) {
      res.status(500).json({
        error: `Error updating todo with id ${req.params.id}, try again later`,
      });
    }
    res.end();
  });
