import { TodoPostgresEntity } from "todo/todo.postgres.entity";
import { PostgresTodoRecord } from "../records/postgres.todo.record";
import { poolPostgres } from "../utils/dbPostgres";

// Mock data
const mockTodo: TodoPostgresEntity = {
  title: "Testing Jest",
  description: "this is mock task",
};

// Helper function to insert a mock todo
async function insertNewMockTodo(): Promise<string> {
  const todoRecord = new PostgresTodoRecord(mockTodo);
  const id = await todoRecord.insertNewTodoPostgres();
  return id;
}

// Cleanup function
async function cleanupPostgresSQLMockData(id: string) {
  await poolPostgres.query("DELETE FROM todos WHERE id = $1", [id]);
}

// Test suite for PostgresTodoRecord
describe("PostgresTodoRecord", () => {
  let insertedTodoId: string;

  beforeEach(async () => {
    insertedTodoId = await insertNewMockTodo();
  });

  afterEach(async () => {
    await cleanupPostgresSQLMockData(insertedTodoId);
  });

  afterAll(async () => {
    await poolPostgres.end();
  });

  test("Can build TodoRecord", () => {
    const todoRecord = new PostgresTodoRecord(mockTodo);
    expect(todoRecord.title).toBe("Testing Jest");
    expect(todoRecord.description).toBe("this is mock task");
  });

  test("Can insert new todo into PostgreSQL", async () => {
    const todoRecord = new PostgresTodoRecord(mockTodo);
    const id = await todoRecord.insertNewTodoPostgres();
    expect(id).toBeDefined();
    await cleanupPostgresSQLMockData(id);
  });

  test("Can get a todo by id from PostgreSQL", async () => {
    const fetchedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(fetchedTodo).not.toBeNull();
    expect(fetchedTodo.title).toBe(mockTodo.title);
  });

  test("Can list all todos from PostgreSQL", async () => {
    const todoRecord1 = new PostgresTodoRecord(mockTodo);
    const id1 = await todoRecord1.insertNewTodoPostgres();

    const todoRecord2 = new PostgresTodoRecord({ ...mockTodo, title: "Another Task" });
    const id2 = await todoRecord2.insertNewTodoPostgres();

    const todos = await PostgresTodoRecord.ListAllPostgres();
    expect(todos.length).toBeGreaterThanOrEqual(2);

    // Cleanup
    await cleanupPostgresSQLMockData(id1);
    await cleanupPostgresSQLMockData(id2);
  });

  test("Can change todo done status", async () => {
    const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(foundedTodo).toBeDefined();
    expect(foundedTodo.is_done).toBeFalsy();

    await foundedTodo.switchIsDoneStatePostgres();
    const updatedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(updatedTodo.is_done).toBeTruthy();
  });

  test("getOneTodoPostgres returns an instance of PostgresTodoRecord", async () => {
    const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(foundedTodo).toBeDefined();
    expect(foundedTodo).toBeInstanceOf(PostgresTodoRecord);
  });

  test("Can delete a selected todo from PostgreSQL", async () => {
    const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(foundedTodo).toBeDefined();

    await foundedTodo.deleteSelectedTodo();

    const deletedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(deletedTodo).toBeNull();
  });

  test("Can update a title for selected todo from PostgreSQL", async () => {
    const foundedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(foundedTodo).toBeDefined();

    const newTitle = "Updated Title";
    await foundedTodo.updateTitle(newTitle);

    const updatedTodo = await PostgresTodoRecord.getOneTodoPostgres(insertedTodoId);
    expect(updatedTodo.title).toBe(newTitle);
  });

  test("Can delete all todos from PostgreSQL", async () => {
    await PostgresTodoRecord.deleteAllTodosPostgres();
    const result = await PostgresTodoRecord.ListAllPostgres();
    expect(result).toEqual([]);
  });

  describe("Title Validation", () => {
    test("Validates too short title for task todo", () => {
      const shortTitle = "X".repeat(2);
      expect(() => new PostgresTodoRecord({ ...mockTodo, title: shortTitle })).toThrow(
        "Title has to be between 3 and 150 characters long"
      );
    });

    test("Validates too long title for task todo", () => {
      const longTitle = "X".repeat(151);
      expect(() => new PostgresTodoRecord({ ...mockTodo, title: longTitle })).toThrow(
        "Title has to be between 3 and 150 characters long"
      );
    });
  });

  describe("Description Validation", () => {
    test("Description is null, do not throw error", () => {
      expect(() => new PostgresTodoRecord({ title: "Description is null" })).not.toThrow(
        "Description has to be between 3 and 255 characters long"
      );
    });

    test("Validates too long description for task todo", () => {
      const longDescription = "X".repeat(256);
      expect(() => new PostgresTodoRecord({ ...mockTodo, description: longDescription })).toThrow(
        "Description has to be between 3 and 255 characters long"
      );
    });

    test("Validates too short description for task todo", () => {
      const shortDescription = "X".repeat(2);
      expect(() => new PostgresTodoRecord({ ...mockTodo, description: shortDescription })).toThrow(
        "Description has to be between 3 and 255 characters long"
      );
    });

    test("No description returns null", () => {
      const todo = new PostgresTodoRecord({ ...mockTodo, description: null });
      expect(todo.description).toBeNull();
    });
  });
});
