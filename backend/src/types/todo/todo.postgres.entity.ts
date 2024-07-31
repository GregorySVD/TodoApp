export interface TodoPostgresEntity {
  id?: string;
  title: string;
  description?: string;
  isDone?: boolean;
  date?: string;
}
