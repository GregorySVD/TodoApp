export interface TodoPostgresEntity {
  id?: string;
  title: string;
  description?: string;
  is_done?: boolean;
  date?: string;
}
