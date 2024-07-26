export interface TodoEntity {
  id?: string;
  title: string;
  description?: string | null;
  isDone?: number;
  date?: string;
}
