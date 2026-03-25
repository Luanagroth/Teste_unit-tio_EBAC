import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NovaTarefa } from '@/components/NovaTarefa';

describe('NovaTarefa', () => {
  it('renderiza os campos e o botao de envio', () => {
    render(<NovaTarefa onAddTask={jest.fn()} />);

    expect(screen.getByLabelText('Titulo')).toBeInTheDocument();
    expect(screen.getByLabelText('Descricao')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Adicionar tarefa' })
    ).toBeInTheDocument();
  });

  it('valida o titulo antes de enviar', async () => {
    const onAddTask = jest.fn();

    render(<NovaTarefa onAddTask={onAddTask} />);

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Informe um titulo para a tarefa.'
    );
    expect(onAddTask).not.toHaveBeenCalled();
  });

  it('envia os dados normalizados e limpa o formulario', async () => {
    const onAddTask = jest.fn().mockResolvedValue(undefined);

    render(<NovaTarefa onAddTask={onAddTask} />);

    fireEvent.change(screen.getByLabelText('Titulo'), {
      target: { value: '  Nova tarefa  ' },
    });
    fireEvent.change(screen.getByLabelText('Descricao'), {
      target: { value: '  Detalhes importantes  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar tarefa' }));

    await waitFor(() =>
      expect(onAddTask).toHaveBeenCalledWith({
        title: 'Nova tarefa',
        description: 'Detalhes importantes',
      })
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Titulo')).toHaveValue('');
      expect(screen.getByLabelText('Descricao')).toHaveValue('');
    });
  });
});
