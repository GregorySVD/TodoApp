import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { TodoEntity } from "../types/index";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { getCurrentFormattedDate } from "../utils/getCurrentFormattedDate";
import { response } from "express";
import { poolPostgres } from "../utils/dbPostgres";

// pool always returns [[result], FieldPacket[]]

type TodoRecordResults = [TodoRecord[], FieldPacket[]];
type TodoRecordResultsPostgres = [TodoRecord[], FieldPacket[]];

export class TodoRecord implements TodoEntity {
  public id?: string;
  public title: string;
  public date?: string;
  public isDone: number;
  public description?: string;

  constructor(obj: TodoEntity) {
    if (!obj.title || obj.title.length < 3 || obj.title.length > 150) {
      throw new ValidationError("Title has to be between 3 and 150 characters long");
    }
    this.id = obj.id || uuid();
    this.title = obj.title;
    this.date = obj.date;
    this.isDone = obj.isDone;

    if (obj.description === null || obj.description === undefined) {
      this.description = null;
    } else if (obj.description.length < 3 || obj.description.length > 255) {
      throw new ValidationError("Description has to be between 3 and 255 characters long");
    } else {
      this.description = obj.description;
    }
  }

  async switchIsDoneState(): Promise<number> {
    try {
      await pool.execute(
        "UPDATE `todos` SET `isDone` = CASE WHEN `isDone` = 0 THEN 1 WHEN `isDone` = 1 THEN 0 END WHERE `id` = :id;",
        {
          id: this.id,
        }
      );
      return this.isDone;
    } catch (err) {
      throw new ValidationError("Cannot switch done state of this tasks. Try again later");
    }
  }

  async insertNewTodo(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      }
      if (!this.isDone) {
        this.isDone = 0;
      }
      if (!this.date) {
        this.date = getCurrentFormattedDate();
      }
      if (!this.description) {
        this.description = null;
      }
      await pool.execute(
        "INSERT INTO `todos` (`id`, `title`, `date`, `isDone`, `description`)VALUES(:id, :title, :date," +
          " :isDone," +
          " :description)",
        {
          id: this.id,
          title: this.title,
          date: this.date,
          isDone: this.isDone,
          description: this.description,
        } as TodoRecord
      );
      return this.id;
    } catch (err) {
      throw new ValidationError("Cannot insert task. Try again later");
    }
  }

  async deleteSelectedTodo(): Promise<void> {
    try {
      await pool.execute("DELETE FROM `todos` WHERE `id` = :id", {
        id: this.id,
      });
    } catch (err) {
      throw new ValidationError("Cannot delete task with given id");
    }
  }
  async updateTitle(title: string): Promise<void> {
    try {
      await pool.execute("UPDATE `todos` SET `title` = :title WHERE `id` = :id", {
        title,
        id: this.id,
      });
    } catch (err) {
      throw new ValidationError("Cannot update title of task. Try again later");
    }
  }
  static async getOneTodo(id: string): Promise<TodoRecord | null> {
    try {
      const [result] = (await pool.execute("SELECT * FROM `todos` WHERE `id` = :id", {
        id,
      })) as TodoRecordResults;
      return result.length === 0 ? null : new TodoRecord(result[0]);
    } catch (err) {
      throw new ValidationError("Cannot get task with given id.");
    }
  }

  static async DeleteAllDoneTodos(): Promise<void> {
    try {
      const [results] = (await await pool.execute("SELECT * FROM `todos` WHERE `isDone` = :isDone", {
        isDone: 1,
      })) as TodoRecordResults;
      if (results.length === 0) {
        return;
      }
      await pool.execute("DELETE FROM `todos` WHERE `isDone` = :isDone", { isDone: 1 });
    } catch (err) {
      throw new ValidationError(err);
    }
  }

  static async DeleteAllTodos(): Promise<void> {
    try {
      await pool.execute("DELETE FROM `todos`");
    } catch (err) {
      throw new ValidationError(err);
    }
  }
  static async ListAll(): Promise<TodoRecord[]> {
    try {
      const [results] = (await pool.execute("SELECT * FROM `todos` ORDER BY `date` ASC")) as TodoRecordResults;
      return results.map(obj => new TodoRecord(obj));
    } catch (err) {
      throw new ValidationError("Cannot get list of Tasks from server");
    }
  }

  ///POSTGRES VERSION

  static async ListAllPostgres(): Promise<TodoRecord[]> {
    try {
      const client = await poolPostgres.connect();
      const result = await poolPostgres.query("SELECT * FROM todos ORDER BY date ASC");
      const results = result.rows as TodoRecord[];
      client.release();
      return results;
    } catch (error) {
      console.error("Database query error:", error);
      throw new ValidationError("Cannot get list of Tasks from server");
    }
  }
  static async getOneTodoPostgres(id: string): Promise<TodoRecord | null> {
    try {
      const values = [id];
      const query = "SELECT * FROM todos WHERE id = $1";
      const result = await poolPostgres.query(query, values);
      const rows = result.rows as TodoRecord[];

      if (rows.length === 0) {
        throw new ValidationError("Task with given id does not exist.");
      }

      return rows[0];
    } catch (err) {
      console.error("Database query error:", err);
      throw new ValidationError("Cannot get task with given id.");
    }
  }
  async insertNewTodoPostgres(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      }
      if (!this.isDone) {
        this.isDone = 0;
      }
      if (!this.date) {
        this.date = getCurrentFormattedDate();
      }
      if (!this.description) {
        this.description = null;
      }
      const query = `INSERT INTO todos (id, title, date, is_done, description) VALUES ($1, $2, $3, $4, $5)`;
      const values = [this.id, this.title, this.date, this.isDone, this.description];

      await poolPostgres.query(query, values);

      return this.id;
    } catch (err) {
      console.error("Database query error:", err);
      throw new ValidationError("Cannot insert task. Try again later");
    }
  }
}
