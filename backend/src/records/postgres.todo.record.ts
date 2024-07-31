import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { TodoEntity } from "../types/index";
import { ValidationError } from "../utils/errors";
import { response } from "express";
import { poolPostgres } from "../utils/dbPostgres";
import { getCurrentFormattedDatePostgres } from "../utils/getCurrentFormettedDatePostgres";
import { TodoPostgresEntity } from "todo/todo.postgres.entity";

// pool always returns [[result], FieldPacket[]]

export class PostgresTodoRecord implements TodoPostgresEntity {
  public id?: string;
  public title: string;
  public date?: string;
  public isDone: boolean;
  public description?: string;

  constructor(obj: TodoPostgresEntity) {
    if (!obj.title || obj.title.length < 3 || obj.title.length > 150) {
      throw new ValidationError("Title has to be between 3 and 150 characters long");
    }
    this.id = obj.id || uuid();
    this.title = obj.title;
    this.date = obj.date;
    this.isDone = obj.isDone !== undefined ? obj.isDone : false;

    if (obj.description === null || obj.description === undefined) {
      this.description = null;
    } else if (obj.description.length < 3 || obj.description.length > 255) {
      throw new ValidationError("Description has to be between 3 and 255 characters long");
    } else {
      this.description = obj.description;
    }
  }

  ///POSTGRES VERSION

  static async ListAllPostgres(): Promise<PostgresTodoRecord[]> {
    try {
      const client = await poolPostgres.connect();
      const result = await poolPostgres.query("SELECT * FROM todos ORDER BY date ASC");
      const results = result.rows as PostgresTodoRecord[];
      client.release();
      return results;
    } catch (error) {
      console.error("Database query error:", error);
      throw new ValidationError("Cannot get list of Tasks from server");
    }
  }
  //Finds todos by id, returns as TodoRecord if successful
  static async getOneTodoPostgres(id: string): Promise<PostgresTodoRecord | null> {
    try {
      const values = [id];
      const query = "SELECT * FROM todos WHERE id = $1";
      const result = await poolPostgres.query(query, values);
      const rows = result.rows as PostgresTodoRecord[];

      if (rows.length === 0) {
        throw new ValidationError("Task with given id does not exist.");
      }

      return new PostgresTodoRecord(rows[0]);
    } catch (err) {
      console.error("Database query error:", err);
      throw new ValidationError("Cannot get task with given id.");
    }
  }
  //Insert new todo<PostgresTodoRecord> returns id in string if successful
  async insertNewTodoPostgres(): Promise<string> {
    try {
      if (!this.id) {
        this.id = uuid();
      }
      if (this.isDone === undefined) {
        this.isDone = false;
      }
      if (!this.date) {
        this.date = getCurrentFormattedDatePostgres();
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
  //Deletes todos with done status
  static async DeleteAllDoneTodosPostgres(): Promise<void> {
    try {
      await poolPostgres.query("DELETE FROM todos WHERE is_done = $1", [1]);
    } catch (err) {
      throw new ValidationError(err);
    }
  }
  //Switch todos with status in Postgres
  async switchIsDoneStatePostgres(): Promise<boolean | number> {
    try {
      const query = `
        UPDATE todos
        SET is_done = NOT is_done
        WHERE id = $1
        RETURNING is_done;
      `;
      const values = [this.id];
      const result = await poolPostgres.query(query, values);
      this.isDone = result.rows[0].is_done;

      return this.isDone;
    } catch (err) {
      console.error("Error in switchIsDoneStatePostgres:", err);
      throw new ValidationError("Cannot switch done state of this task. Try again later");
    }
  }

  //Deletes all todos in DB
  static async deleteAllTodosPostgres(): Promise<void> {
    try {
      await poolPostgres.query("DELETE FROM todos");
    } catch (err) {
      throw new ValidationError(err);
    }
  }
}
