import {TodoEntity} from "../src/types/todo";
import {ValidationError} from "../src/utils/errors";


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
        if (obj.description.length < 3 || obj.description.length > 255) {
            throw new ValidationError("Description has to be between 3 and 255 characters long");
        }
        this.id = obj.id;
        this.title = obj.title;
        this.date = obj.date;
        this.isDone = obj.isDone;
        this.description = obj.description;
    }
}
