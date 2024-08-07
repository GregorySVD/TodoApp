import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { TodoEntity } from "../types/index";
import { ValidationError } from "../utils/errors";
import { pool } from "../utils/db";
import { getCurrentFormattedDate } from "../utils/getCurrentFormattedDate";

// pool always returns [[result], FieldPacket[]]

type TodoRecordResults = [TodoRecord[], FieldPacket[]];

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

  async switchIsDoneState(): Promise<boolean | number> {
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

  //Deletes one tasks
  async deleteSelectedTodo(): Promise<void> {
    try {
      await pool.execute("DELETE FROM `todos` WHERE `id` = :id", {
        id: this.id,
      });
    } catch (err) {
      throw new ValidationError("Cannot delete task with given id");
    }
  }
  //Updates title of todo by id
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
  //Finds todo by id in string, returns TodoRecord of null
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
  //Deletes all tasks with .done === true
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
  //Deletes all todos from DB
  static async DeleteAllTodos(): Promise<void> {
    try {
      await pool.execute("DELETE FROM `todos`");
    } catch (err) {
      throw new ValidationError(err);
    }
  }
  //Returns [] of TodoRecordResults
  static async ListAll(): Promise<TodoRecord[]> {
    try {
      const [results] = (await pool.execute("SELECT * FROM `todos` ORDER BY `date` ASC")) as TodoRecordResults;
      return results.map(obj => new TodoRecord(obj));
    } catch (err) {
      throw new ValidationError("Cannot get list of Tasks from server");
    }
  }
}
