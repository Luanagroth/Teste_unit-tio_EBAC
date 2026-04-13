import { NextResponse } from 'next/server';
import {
  deleteTask,
  getTaskById,
  updateTask,
} from '@/backend/lib/taskStore';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const task = await getTaskById(id);

  if (!task) {
    return NextResponse.json(
      {
        success: false,
        message: 'Tarefa nao encontrada.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: task,
  });
}

export async function PUT(request: Request, { params }: RouteContext) {
  const { id } = await params;
  const body = (await request.json()) as {
    title?: string;
    description?: string;
    completed?: boolean;
  };

  if (body.title !== undefined && body.title.trim().length === 0) {
    return NextResponse.json(
      {
        success: false,
        message: 'Titulo e obrigatorio.',
      },
      { status: 400 }
    );
  }

  const task = await updateTask(id, body);

  if (!task) {
    return NextResponse.json(
      {
        success: false,
        message: 'Tarefa nao encontrada.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: task,
    message: 'Tarefa atualizada com sucesso.',
  });
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;
  const removed = await deleteTask(id);

  if (!removed) {
    return NextResponse.json(
      {
        success: false,
        message: 'Tarefa nao encontrada.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Tarefa removida com sucesso.',
  });
}
