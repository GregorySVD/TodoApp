import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {TodoEntity} from "../src/types";
import {ValidationError} from "../src/utils/errors.ts";
import {pool} from "../src/utils/db.ts";
import {getCurrentFormattedDate} from "../src/utils/getCurrentFormattedDate.ts";


// pool always returns [[result], FieldPacket[]]

type TodoRecordResults = [TodoRecord[], FieldPacket[]];


export class TodoRecord implements TodoEntity {
    public id?: string;
    public title: string;
    public date?: string;
    public isDone: boolean;
    public description?: string | null;

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

    async switchIsDoneState(): Promise<boolean> {
        await pool.execute("UPDATE `todos` SET `isDone` = CASE WHEN `isDone` = 0 THEN 1 WHEN `isDone` = 1 THEN 0 END WHERE `id` = :id;", {
            id: this.id,
        });
        return this.isDone;
    }


    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.isDone) {
            this.isDone = false;
        }
        if (!this.date) {
            this.date = getCurrentFormattedDate();
        }
        if (!this.description) {
            this.description = null;
        }
        await pool.execute("INSERT INTO `todos` (`id`, `title`, `date`, `isDone`, `description`)VALUES(:id, :title, :date," +
            " :isDone," +
            " :description)", {
            id: this.id,
            title: this.title,
            date: this.date,
            isDone: this.isDone,
            description: this.description,
        } as TodoRecord);
        return this.id;
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `todos` WHERE `id` = :id", {
            id: this.id,
        });
    }

    static async getOne(id: string): Promise<TodoRecord | null> {
        const [result] = (await pool.execute("SELECT * FROM `todos` WHERE `id` = :id",
            {
                id,
            }) as TodoRecordResults);
        return result.length === 0 ? null : new TodoRecord(result[0]);
    }

    static async ListAll(): Promise<TodoRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `todos` ORDER BY `date` ASC")) as TodoRecordResults;
        return results.map(obj => new TodoRecord(obj));
    }

    static async DeleteAllDoneTasks(): Promise<void> {
        try {
            const [results] = (await pool.execute("SELECT * FROM `todos` WHERE `isDone` = :isDone", { isDone: 1 })) as TodoRecordResults;

            if(results.length > 0) {
                throw new ValidationError("There are no tasks done");
            }
            await pool.execute("DELETE FROM `todos` WHERE `isDone` = :isDone", { isDone: true });
        } catch (err) {
            throw new ValidationError(err);
        }

    }
}
