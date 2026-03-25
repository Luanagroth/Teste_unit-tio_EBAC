import type { Task } from '@/backend/types/task';

export function useContadorDeTarefas(tasks: Task[]) {
  return tasks.length;
}

