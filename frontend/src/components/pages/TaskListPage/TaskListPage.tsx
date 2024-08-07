import { AddTaskForm } from "src/components/AddTaskForm/AddTaskForm";
import { TaskList } from "src/components/TasksList/TaskList";
import { TaskProgress } from "src/components/TasksList/TaskPogress/TaskProgress";

export const TaskListPage = () => {
  return (
    <div className="TaskList_loaded_content">
      <TaskProgress />
      <TaskList />
      <AddTaskForm />
    </div>
  );
};
