import {pool} from "../src/utils/db";
import {TodoEntity} from "../src/types";
import {TodoRecord} from "../records/todo.record";


const mockTodo: TodoEntity = {
    title: "Testing Jest",
};
const mockTodoWithId: TodoEntity = {
    title: "Testing Jest Id",
    id: "test-test-test",
};

afterAll(async () => {
    await pool.end();
});
test("TodoRecord returns data from database from one entry", async () => {
    const insertedTodo = await new TodoRecord(mockTodoWithId);
    expect(insertedTodo).toBeDefined();

    const todo = await TodoRecord.getOneTodo("test-test-test");
    expect(todo).toBeDefined();

    if (todo) {
        expect(todo.id).toBe("Testing Jest Id");
        expect(todo.title).toBe("Testing Jest Id");
        expect(todo.description).toBeDefined();
        expect(todo.isDone).toBeDefined();
        expect(todo.date).toBeDefined();
    }
});

test("TodoRecord returns null from database from unexisting entry", async () => {
    const todo = await TodoRecord.getOneTodo("unexistingId");

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
    await todo.insertNewTodo();

    if (todo) {
        expect(todo.id).toBeDefined();
        expect(todo.description).toBeNull();
        expect(todo.date).toBeDefined();
        expect(todo.isDone).toBeFalsy();
        expect(typeof todo.id).toBe("string");
    }

});
test("TodoRecord.switchIsDoneState changes the state of isDone", async () => {
    const todo = new TodoRecord(mockTodo);
    const insertedId = await todo.insertNewTodo();
    expect(todo.isDone).toBeFalsy();
    await todo.switchIsDoneState();
    const test = await TodoRecord.getOneTodo(insertedId);
    expect(test.isDone).toBeTruthy();
});
test("TodoRecord.updateTitle updates the title", async () => {
    const todo = new TodoRecord(mockTodo);
    const insertedId = await todo.insertNewTodo();
    await todo.updateTitle("Testing endpoint!");
    const test = await TodoRecord.getOneTodo(insertedId);
    expect(test.title).toBe("Testing endpoint!");
});
