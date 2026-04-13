import { NextResponse } from 'next/server';
import { addTask, getTasks } from '@/backend/lib/taskStore';

export async function GET() {
  try {
    const tasks = await getTasks();

    return NextResponse.json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno ao listar tarefas.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      title?: string;
      description?: string;
    };

    if (!body.title || body.title.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'TÃ­tulo Ã© obrigatÃ³rio.',
        },
        { status: 400 }
      );
    }

    const task = await addTask({
      title: body.title,
      description: body.description ?? '',
    });

    return NextResponse.json(
      {
        success: true,
        data: task,
        message: 'Tarefa criada com sucesso.',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Erro interno ao criar tarefa.',
      },
      { status: 500 }
    );
  }
}
