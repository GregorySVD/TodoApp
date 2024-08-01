import { TodoEntity } from "../types";
import { TodoRecord } from "../records/todo.record";
import { pool } from "../utils/db";
import { poolPostgres } from "../utils/dbPostgres";
import { PostgresTodoRecord } from "../records/postgres.todo.record";
import { TodoPostgresEntity } from "todo/todo.postgres.entity";

//Mock
const mockTodo: TodoPostgresEntity = {
  title: "Testing Jest",
  description: "this is mock task",
};

//Insert new Todo

async function insertNewMockTodo(): Promise<string> {
  const todoRecord = new PostgresTodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  return id;
}

test("Can build TodoRecord", async () => {
  const todoRecord = new PostgresTodoRecord(mockTodo);

  expect(todoRecord.title).toBe("Testing Jest");
  expect(todoRecord.description).toBe("this is mock task");
});
//CLEAN UP PostgresSQL
async function CleanupPostgresSQLMockData(id: string) {
  await poolPostgres.query("DELETE FROM todos WHERE id = $1", [id]);
}

//PostgresSQL tests
test("Can build TodoRecord", async () => {
  const todoRecord = new PostgresTodoRecord(mockTodo);
  expect(todoRecord.title).toBe("Testing Jest");
  expect(todoRecord.description).toBe("this is mock task");
});
// Title Validation
test("Validates too short title for task todo", async () => {
  const shortTitle = "X".repeat(2);
  expect(
    () =>
      new PostgresTodoRecord({
        ...mockTodo,
        title: shortTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});

test("Validates too long title for task todo", async () => {
  const longTitle = "X".repeat(151);
  expect(
    () =>
      new PostgresTodoRecord({
        ...mockTodo,
        title: longTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});

// Description Validation
test("Description is null, do not throw error", async () => {
  expect(
    () =>
      new PostgresTodoRecord({
        title: "Description is null",
      })
  ).not.toThrow("Description has to be between 3 and 255 characters long");
});

test("Validates too long description for task todo", async () => {
  const longDescription = "X".repeat(256);
  expect(
    () =>
      new PostgresTodoRecord({
        ...mockTodo,
        description: longDescription,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});

test("Validates too short description for task todo", async () => {
  const shortDescription = "X".repeat(2);
  expect(
    () =>
      new PostgresTodoRecord({
        ...mockTodo,
        description: shortDescription,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});

test("No description returns null", async () => {
  const todo = new PostgresTodoRecord({
    ...mockTodo,
    description: null,
  });
  expect(todo.description).toBeNull();
});

// PostgreSQL CRUD tests

test("Can insert new todo into PostgreSQL", async () => {
  const todoRecord = new PostgresTodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  expect(id).toBeDefined();

  await CleanupPostgresSQLMockData(id);
});
test("Can get a todo by id from PostgreSQL", async () => {
  const todoRecord = new PostgresTodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  const fetchedTodo = await PostgresTodoRecord.getOneTodoPostgres(id);
  expect(fetchedTodo).not.toBeNull();
  expect(fetchedTodo.title).toBe(mockTodo.title);

  await CleanupPostgresSQLMockData(id);
});

test("Can delete all todos from PostgreSQL", async () => {
  await PostgresTodoRecord.deleteAllTodosPostgres();
  const result = await PostgresTodoRecord.ListAllPostgres();

  expect(result).toEqual([]);
});

test("Can list all todos from PostgreSQL", async () => {
  const todoRecord1 = new PostgresTodoRecord(mockTodo);
  const id1 = await todoRecord1.insertNewTodoPostgres();

  const todoRecord2 = new PostgresTodoRecord({ ...mockTodo, title: "Another Task" });
  const id2 = await todoRecord2.insertNewTodoPostgres();

  const todos = await PostgresTodoRecord.ListAllPostgres();
  expect(todos.length).toBeGreaterThanOrEqual(2);

  // Cleanup
  await CleanupPostgresSQLMockData(id1);
  await CleanupPostgresSQLMockData(id2);
});
//end of pool

test("Can change todo done status", async () => {
  const insertedTodoId = await insertNewMockTodo();
  const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);

  expect(foundedTodo).toBeDefined();
  expect(foundedTodo.isDone).toBeFalsy();

  await foundedTodo.switchIsDoneStatePostgres();
  expect(foundedTodo.isDone).toBeTruthy();

  const updatedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
  expect(updatedTodo.isDone).toBeFalsy();

  await CleanupPostgresSQLMockData(insertedTodoId);
});

test("getOneTodoPostgres returns an instance of PostgresTodoRecord", async () => {
  const insertedTodoId = await insertNewMockTodo();
  const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);

  expect(foundedTodo).toBeDefined();
  expect(foundedTodo).toBeInstanceOf(PostgresTodoRecord);

  await CleanupPostgresSQLMockData(insertedTodoId);
});

afterAll(async () => {
  await poolPostgres.end();
});
