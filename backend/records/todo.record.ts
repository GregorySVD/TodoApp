import {TodoEntity} from "../src/types/todo";
import {ValidationError} from "../src/utils/errors";
import {pool} from "../src/utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";
import {getCurrentFormattedDate} from "../src/utils/getCurrentFormattedDate";


//pool always returns [[result], FieldPacket[]]
type TodoRecordResults = [TodoRecord[], FieldPacket[]]


export class TodoRecord implements TodoEntity {
    public id?: string;
    public title: string;
    public date?: string;
    public isDone?: boolean;
    public description?: string;

    constructor(obj: TodoEntity) {
        if (!obj.title || obj.title.length < 3 || obj.title.length > 150) {
            throw new ValidationError("Title has to be between 3 and 150 characters long");
        }
        //@TODO: Add description validation
        this.id = obj.id;
        this.title = obj.title;
        this.date = obj.date;
        this.isDone = obj.isDone;
        this.description = obj.description;
    }
    async markItDone():Promise<void> {
        await pool.execute("UPDATE `todos` SET `isDone` = 1 WHERE `id` = :id",{
            id: this.id,
        });
    }
    async markItUnDone():Promise<void> {
        await pool.execute("UPDATE `todos` SET `isDone` = 0 WHERE `id` = :id",{
            id: this.id,
        });
    }


    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }
        if (!this.isDone) {
            this.isDone = false
        }
        if (!this.date) {
            this.date = getCurrentFormattedDate();
        }
        await pool.execute("INSERT INTO `todos` VALUES(:id, :title, :date, :isDone, :description)", {
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
        })
    }

    static async getOne(id: string): Promise<TodoRecord | null> {
        const [result] = (await pool.execute("SELECT * FROM `todos` WHERE `id` = :id",
            {
                id,
            }) as TodoRecordResults)
        return result.length === 0 ? null : new TodoRecord(result[0]);
    }

    static async ListAll(): Promise<TodoRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `todos` ORDER BY `date` ASC")) as TodoRecordResults;
        return results.map(obj => new TodoRecord(obj));
    }

}
