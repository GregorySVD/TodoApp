export interface TodoEntity {
    id?: string;
    title: string;
    description?: string | null;
    isDone?: boolean | number;
    date?: string;
}
