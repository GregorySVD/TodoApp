import { TodoEntity } from "../types";
import { TodoRecord } from "../records/todo.record";
import { pool } from "../utils/db";
import { poolPostgres } from "../utils/dbPostgres";

//Mock
const mockTodo: TodoEntity = {
  title: "Testing Jest",
  description: "this is mock task",
};
test("Can build TodoRecord", async () => {
  const todoRecord = new TodoRecord(mockTodo);

  expect(todoRecord.title).toBe("Testing Jest");
  expect(todoRecord.description).toBe("this is mock task");
});
//CLEAN UP PostgresSQL
async function CleanupPostgresSQLMockData(id: string) {
  await poolPostgres.query("DELETE FROM todos WHERE id = $1", [id]);
}

// MySQL tests

// title Validation
test("Validates too short title for task todo", async () => {
  const shortTitle = "X".repeat(2);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        title: shortTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});
test("Validates too long title for task todo", async () => {
  const longTitle = "X".repeat(151);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        title: longTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});

// Description validation
test("Description is null, do not throw error", async () => {
  expect(
    () =>
      new TodoRecord({
        title: "Description is null",
      })
  ).not.toThrow("Description has to be between 3 and 255 characters long");
});
test("Validates too long description for task todo", async () => {
  const longTitle = "X".repeat(256);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        description: longTitle,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});
test("Validates too short description for task todo", async () => {
  const longTitle = "X".repeat(2);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        description: longTitle,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});
test("No description returns null", async () => {
  const Todo = new TodoRecord({
    ...mockTodo,
    description: null,
  });
  console.log(Todo);
  expect(Todo.description).toBeNull();
});

//PostgresSQL tests
test("Can build TodoRecord", async () => {
  const todoRecord = new TodoRecord(mockTodo);
  expect(todoRecord.title).toBe("Testing Jest");
  expect(todoRecord.description).toBe("this is mock task");
});
// Title Validation
test("Validates too short title for task todo", async () => {
  const shortTitle = "X".repeat(2);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        title: shortTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});

test("Validates too long title for task todo", async () => {
  const longTitle = "X".repeat(151);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        title: longTitle,
      })
  ).toThrow("Title has to be between 3 and 150 characters long");
});

// Description Validation
test("Description is null, do not throw error", async () => {
  expect(
    () =>
      new TodoRecord({
        title: "Description is null",
      })
  ).not.toThrow("Description has to be between 3 and 255 characters long");
});

test("Validates too long description for task todo", async () => {
  const longDescription = "X".repeat(256);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        description: longDescription,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});

test("Validates too short description for task todo", async () => {
  const shortDescription = "X".repeat(2);
  expect(
    () =>
      new TodoRecord({
        ...mockTodo,
        description: shortDescription,
      })
  ).toThrow("Description has to be between 3 and 255 characters long");
});

test("No description returns null", async () => {
  const todo = new TodoRecord({
    ...mockTodo,
    description: null,
  });
  expect(todo.description).toBeNull();
});

// PostgreSQL CRUD tests

test("Can insert new todo into PostgreSQL", async () => {
  const todoRecord = new TodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  expect(id).toBeDefined();

  await CleanupPostgresSQLMockData(id);
});
test("Can get a todo by id from PostgreSQL", async () => {
  const todoRecord = new TodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  const fetchedTodo = await TodoRecord.getOneTodoPostgres(id);
  expect(fetchedTodo).not.toBeNull();
  expect(fetchedTodo.title).toBe(mockTodo.title);

  await CleanupPostgresSQLMockData(id);
});

test("Can list all todos from PostgreSQL", async () => {
  const todoRecord1 = new TodoRecord(mockTodo);
  const id1 = await todoRecord1.insertNewTodoPostgres();

  const todoRecord2 = new TodoRecord({ ...mockTodo, title: "Another Task" });
  const id2 = await todoRecord2.insertNewTodoPostgres();

  const todos = await TodoRecord.ListAllPostgres();
  expect(todos.length).toBeGreaterThanOrEqual(2);

  // Cleanup
  await CleanupPostgresSQLMockData(id1);
  await CleanupPostgresSQLMockData(id2);
});

test("Can delete all todos from PostgreSQL", async () => {
  await TodoRecord.DeleteAllTodosPostgres();
  const result = await TodoRecord.ListAllPostgres();

  expect(result).toEqual([]);
});

//end of pool

afterAll(async () => {
  await pool.end();
});
