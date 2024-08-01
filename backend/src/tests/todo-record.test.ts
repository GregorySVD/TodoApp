import { TodoEntity } from "../types";
import { TodoRecord } from "../records/todo.record";
import { pool } from "../utils/db";
import { poolPostgres } from "../utils/dbPostgres";

//Mock
const mockTodo: TodoEntity = {
  title: "Testing Jest",
  description: "this is mock task",
};

//Insert new Todo

async function insertNewMockTodo(): Promise<string> {
  const todoRecord = new TodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodo();
  return id;
}

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
  expect(Todo.description).toBeNull();
});

afterAll(async () => {
  await pool.end();
});
