'use client';

import { useCallback, useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { NovaTarefa } from '@/components/NovaTarefa';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';
import type { Task, TaskInput } from '@/types/task';

type TaskBoardProps = {
  initialTasks: Task[];
};

type EditingState = {
  id: string;
  title: string;
  description: string;
} | null;

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

type TaskListResponse = ApiResponse<Task[]> & {
  count?: number;
};

export function TaskBoard({ initialTasks }: TaskBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [editingTask, setEditingTask] = useState<EditingState>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const totalTasks = useContadorDeTarefas(tasks);
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const request = useCallback(async function request<T>(
    input: RequestInfo,
    init?: RequestInit
  ) {
    const response = await fetch(input, init);
    const body = (await response.json()) as Partial<ApiResponse<T>>;

    if (!response.ok) {
      throw new Error(body.message ?? 'Falha ao processar a requisicao.');
    }

    return body;
  }, []);

  const syncTasks = useCallback(async function syncTasks(showMessage = false) {
    setIsRefreshing(true);

    try {
      const response = await fetch('/api/tasks', { cache: 'no-store' });
      const body = (await response.json()) as Partial<TaskListResponse>;

      if (!response.ok) {
        throw new Error(body.message ?? 'Nao foi possivel atualizar a lista.');
      }

      const freshTasks = Array.isArray(body.data) ? body.data : [];
      setTasks(freshTasks);

      setEditingTask((currentEditingTask) => {
        if (!currentEditingTask) {
          return currentEditingTask;
        }

        const freshEditingTask = freshTasks.find(
          (task) => task.id === currentEditingTask.id
        );

        return freshEditingTask
          ? {
              id: freshEditingTask.id,
              title: freshEditingTask.title,
              description: freshEditingTask.description,
            }
          : null;
      });

      if (showMessage) {
        setStatusMessage('Lista atualizada com sucesso.');
      }
    } catch (error) {
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a lista.'
      );
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void syncTasks();

    const intervalId = window.setInterval(() => {
      void syncTasks();
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [syncTasks]);

  async function handleAddTask(task: TaskInput) {
    const body = await request<Task>('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    if (!body.data) {
      throw new Error('A resposta nao trouxe a tarefa criada.');
    }

    setTasks((currentTasks) => [body.data as Task, ...currentTasks]);
    setStatusMessage('Tarefa adicionada com sucesso.');
  }

  function startEditing(task: Task) {
    setEditingTask({
      id: task.id,
      title: task.title,
      description: task.description,
    });
    setStatusMessage('');
  }

  function cancelEditing() {
    setEditingTask(null);
  }

  async function handleUpdateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingTask || !editingTask.title.trim()) {
      setStatusMessage('O titulo nao pode ficar vazio.');
      return;
    }

    try {
      const body = await request<Task>(`/api/tasks/${editingTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingTask.title,
          description: editingTask.description,
        }),
      });

      if (!body.data) {
        throw new Error('A resposta nao trouxe a tarefa atualizada.');
      }

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id ? (body.data as Task) : task
        )
      );
      setEditingTask(null);
      setStatusMessage('Tarefa atualizada com sucesso.');
    } catch (error) {
      await syncTasks();
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a tarefa.'
      );
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      const body = await request<Task>(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !task.completed,
        }),
      });

      if (!body.data) {
        throw new Error('A resposta nao trouxe a tarefa atualizada.');
      }

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === task.id ? (body.data as Task) : currentTask
        )
      );
      setStatusMessage(
        task.completed
          ? 'Tarefa marcada como pendente.'
          : 'Tarefa concluida com sucesso.'
      );
    } catch (error) {
      await syncTasks();
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel atualizar a tarefa.'
      );
    }
  }

  async function handleDeleteTask(taskId: string) {
    try {
      await request<null>(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );

      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }

      setStatusMessage('Tarefa removida com sucesso.');
    } catch (error) {
      await syncTasks();
      setStatusMessage(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel remover a tarefa.'
      );
    }
  }

  return (
    <section className="board">
      <div className="summary-grid">
        <article className="summary-card">
          <span className="summary-label">Total de tarefas</span>
          <strong className="summary-value">{totalTasks}</strong>
        </article>

        <article className="summary-card">
          <span className="summary-label">Pendentes</span>
          <strong className="summary-value">{pendingTasks}</strong>
        </article>

        <article className="summary-card">
          <span className="summary-label">Concluidas</span>
          <strong className="summary-value">{completedTasks}</strong>
        </article>
      </div>

      <div className="layout-grid">
        <aside className="panel">
          <h2>Nova tarefa</h2>
          <p className="panel-copy">
            Use o formulario controlado para adicionar tarefas e acompanhar o
            contador atualizado.
          </p>
          <NovaTarefa onAddTask={handleAddTask} />
          {statusMessage ? (
            <p className="status-message" role="status">
              {statusMessage}
            </p>
          ) : null}
        </aside>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Tarefas cadastradas</h2>
              <p className="panel-copy">
                Edite, conclua ou exclua tarefas sem precisar sair da pagina.
              </p>
            </div>
            <button
              className="ghost-button"
              type="button"
              onClick={() => void syncTasks(true)}
              disabled={isRefreshing}
            >
              {isRefreshing ? 'Atualizando...' : 'Atualizar lista'}
            </button>
          </div>

          {editingTask ? (
            <form className="edit-form" onSubmit={handleUpdateTask}>
              <div className="field">
                <label htmlFor="edit-title">Editar titulo</label>
                <input
                  id="edit-title"
                  value={editingTask.title}
                  onChange={(event) =>
                    setEditingTask((currentTask) =>
                      currentTask
                        ? { ...currentTask, title: event.target.value }
                        : currentTask
                    )
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="edit-description">Editar descricao</label>
                <textarea
                  id="edit-description"
                  value={editingTask.description}
                  onChange={(event) =>
                    setEditingTask((currentTask) =>
                      currentTask
                        ? {
                            ...currentTask,
                            description: event.target.value,
                          }
                        : currentTask
                    )
                  }
                />
              </div>

              <div className="button-row">
                <button className="button" type="submit">
                  Salvar alteracoes
                </button>
                <button
                  className="ghost-button"
                  type="button"
                  onClick={cancelEditing}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : null}

          {tasks.length === 0 ? (
            <div className="empty-state">
              Nenhuma tarefa cadastrada no momento.
            </div>
          ) : (
            <div className="task-list">
              {tasks.map((task) => (
                <article
                  key={task.id}
                  className={`task-card${task.completed ? ' is-completed' : ''}`}
                >
                  <div className="task-header">
                    <div>
                      <h3
                        className={`task-title${task.completed ? ' is-completed' : ''}`}
                      >
                        {task.title}
                      </h3>
                      <p className="task-description">
                        {task.description || 'Sem descricao informada.'}
                      </p>
                    </div>
                    <span
                      className={`pill ${task.completed ? 'is-completed' : 'is-pending'}`}
                    >
                      {task.completed ? 'Concluida' : 'Pendente'}
                    </span>
                  </div>

                  <div className="task-actions">
                    <button
                      className="ghost-button"
                      type="button"
                      onClick={() => startEditing(task)}
                    >
                      Editar
                    </button>
                    <button
                      className="button"
                      type="button"
                      onClick={() => handleToggleTask(task)}
                    >
                      {task.completed ? 'Marcar pendente' : 'Concluir tarefa'}
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
