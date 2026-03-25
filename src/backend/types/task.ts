export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

export type TaskInput = {
  title: string;
  description: string;
};

export type TaskUpdateInput = Partial<TaskInput> & {
  completed?: boolean;
};
