export interface Todo {
  _id: string;
  created_by: number;
  title: string;
  completed: boolean;
  date: Date;
  priority: string;
}
