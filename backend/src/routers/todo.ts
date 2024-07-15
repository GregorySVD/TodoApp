import { Request, Response, Router } from "express";
import { TodoRecord } from "../../records/todo.record.ts";
import { ValidationError } from "../utils/errors.ts";

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
  .delete("/", async (req: Request, res: Response) => {
    try {
      await TodoRecord.DeleteAllTodos();
    } catch (err) {
      throw new ValidationError("Cannot delete all tasks at this moment");
    }
    res.end();
  })
  .get("/:id", async (req: Request, res: Response) => {
    try {
      const result = await TodoRecord.getOneTodo(req.params.id);
      if (!result) {
        res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
      } else {
        res.json(result);
      }
    } catch (err) {
      throw new ValidationError("Task with given id does not exist");
    }
  })
  .delete("/done", async (req, res) => {
    try {
      await TodoRecord.DeleteAllDoneTodos();
      res.end();
    } catch (e) {
      throw new ValidationError("Cannot delete this tasks, try again later");
    }
  })
  .delete("/:id", async (req: Request, res: Response) => {
    try {
      const task = await TodoRecord.getOneTodo(req.params.id);
      if (!task) {
        res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
      }
      await task.deleteSelectedTodo();
      res.end();
    } catch (err) {
      throw new ValidationError("Cannot delete task with given id");
    }
  })

  .post("/", async (req: Request, res: Response) => {
    try {
      const newTask = new TodoRecord(req.body);
      await console.log(newTask);
      await newTask.insertNewTodo();
      res.json(newTask);
    } catch (err) {
      throw new ValidationError("Cannot insert task with given id");
    }
  })
  .patch("/switch/:id", async (req: Request, res: Response) => {
    const task = await TodoRecord.getOneTodo(req.params.id);
    if (!task) {
      res.status(404).json({ error: `Task with id ${req.params.id} does not exist` });
    }
    try {
      await task.switchIsDoneState();
      res.json({ isDone: task.isDone });
    } catch (err) {
      res.status(500).json({
        error: `Error updating todo with id ${req.params.id}, try again later`,
      });
    }
    res.end();
  })
  .patch("/updateTitle/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title } = req.body;
    const task = await TodoRecord.getOneTodo(id);
    if (!task) {
      res.status(404).json({ error: `Task with id ${id} does not exist` });
    }
    try {
      await task.updateTitle(title);
      await res.json(task);
    } catch (err) {
      res.status(500).json({
        error: `Error while updating todo with id ${req.params.id}, try again later`,
      });
    }
    res.end();
  });
