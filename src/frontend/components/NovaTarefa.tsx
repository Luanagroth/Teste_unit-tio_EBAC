'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import type { TaskInput } from '@/backend/types/task';

type NovaTarefaProps = {
  onAddTask: (task: TaskInput) => Promise<void>;
};

export function NovaTarefa({ onAddTask }: NovaTarefaProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (!normalizedTitle) {
      setError('Informe um titulo para a tarefa.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await onAddTask({
        title: normalizedTitle,
        description: description.trim(),
      });
      setTitle('');
      setDescription('');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Nao foi possivel adicionar a tarefa.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Titulo</label>
        <input
          id="title"
          name="title"
          value={title}
          placeholder="Ex.: finalizar documentacao"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Descricao</label>
        <textarea
          id="description"
          name="description"
          value={description}
          placeholder="Detalhes opcionais da tarefa"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="button-row">
        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Adicionar tarefa'}
        </button>
      </div>
    </form>
  );
}

