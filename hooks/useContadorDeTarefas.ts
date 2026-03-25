import type { Task } from '@/types/task';

export function useContadorDeTarefas(tasks: Task[]) {
  return tasks.length;
}
