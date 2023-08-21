import {TodoEntity} from "../src/types/todo";
import {ValidationError} from "../src/utils/errors";
import {pool} from "../src/utils/db";
import {FieldPacket} from "mysql2";


//pool always returns [[result], FieldPacket[]]
type TodoRecordResults = [TodoRecord[], FieldPacket[]]


export class TodoRecord implements TodoEntity {
    public id?: string;
    public title: string;
    public date: string;
    public isDone: boolean;
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

    static async ListAll(): Promise<TodoRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `todos` ORDER BY `date` ASC")) as TodoRecordResults;
        return results.map(obj => new TodoRecord(obj));
    }

}