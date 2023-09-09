import {pool} from "../src/utils/db";
import {TodoEntity} from "../src/types";
import {TodoRecord} from "../records/todo.record";


const mockTodo: TodoEntity = {
    title: "Testing Jest",
};

afterAll(async () => {
    await pool.end();
});
test("TodoRecord returns data from database from one entry", async () => {
    const todo = await TodoRecord.getOne("719ce2da-c46e-46b8-a6dd-213265fe8633");
    expect(todo).toBeDefined();
    expect(todo.id).toBe("719ce2da-c46e-46b8-a6dd-213265fe8633");
    expect(todo.title).toBe("KICIA DO APTEKI!");
    expect(todo.description).toBeDefined();
    expect(todo.isDone).toBeFalsy();
    expect(todo.date).toBeDefined();
});

test("TodoRecord returns null from database from unexisting entry", async () => {
    const todo = await TodoRecord.getOne("unexistingId");

    expect(todo).toBeNull();
});
test("TodoRecord returns list of records from database", async () => {
    const todoList = await TodoRecord.ListAll();
    expect(todoList).toBeDefined();
    expect(todoList).not.toEqual([]);
    expect(todoList[0]).toBeDefined();
});

test("TodoRecord.insert returns UUID, description is  null, isDone=false and date is defined", async () => {
    const todo = new TodoRecord(mockTodo);
    await todo.insert();

    expect(todo.id).toBeDefined();
    expect(todo.description).toBeNull();
    expect(todo.date).toBeDefined();
    expect(todo.isDone).toBeFalsy();
    expect(typeof todo.id).toBe("string");
});
