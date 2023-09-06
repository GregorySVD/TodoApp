import {createContext} from "react";
import { TodoEntity } from "types";

interface TodoContextProps {
    tasks: TodoEntity[];
}
export const TaskContext = createContext<TodoContextProps | null>(null);
