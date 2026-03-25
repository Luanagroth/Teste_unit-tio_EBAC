import { renderHook } from '@testing-library/react';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import type { Task } from '@/types/task';

describe('useContadorDeTarefas', () => {
  it('retorna a quantidade atual de tarefas', () => {
    const initialTasks: Task[] = [
      {
        id: '1',
        title: 'Task 1',
        description: '',
        completed: false,
      },
      {
        id: '2',
        title: 'Task 2',
        description: '',
        completed: true,
      },
    ];

    const { result, rerender } = renderHook(
      ({ tasks }) => useContadorDeTarefas(tasks),
      {
        initialProps: {
          tasks: initialTasks,
        },
      }
    );

    expect(result.current).toBe(2);

    rerender({
      tasks: [
        ...initialTasks,
        {
          id: '3',
          title: 'Task 3',
          description: '',
          completed: false,
        },
      ],
    });

    expect(result.current).toBe(3);
  });
});
