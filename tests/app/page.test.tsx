import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';
import { resetTasks } from '@/backend/lib/taskStore';

describe('HomePage', () => {
  beforeEach(() => {
    resetTasks();
  });

  it('renderiza a pagina com tarefas vindas da fonte local', async () => {
    render(await HomePage());

    expect(
      screen.getByRole('heading', { name: 'Lista de tarefas com Next.js 15' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Revisar requisitos da entrega')
    ).toBeInTheDocument();
    expect(screen.getByText('Adicionar novas tarefas')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Adicionar tarefa' })
    ).toBeInTheDocument();
  });
});

