import {TodoEntity} from "../src/types";
import {TodoRecord} from "../records/todo.record";
import {pool} from "../src/utils/db";

const mockTodo: TodoEntity = {
    title: "Testing Jest",
    description: "this is mock task",
};
afterAll(async () => {
    await pool.end();
});

test("Can build TodoRecord", async () => {
    const ad = new TodoRecord(mockTodo);

    expect(ad.title).toBe("Testing Jest");
    expect(ad.description).toBe("this is mock task");
});
test("Validates too short title for task todo", async () => {
    const shortTitle = "X".repeat(2);
    expect(() => new TodoRecord({
        ...mockTodo,
        title: shortTitle,
    })).toThrow("Title has to be between 3 and 150 characters long");
});
test("Validates too long title for task todo", async () => {
    const longTitle = "X".repeat(151);
    expect(() => new TodoRecord({
        ...mockTodo,
        title: longTitle,
    })).toThrow("Title has to be between 3 and 150 characters long");
});
