import { randomUUID } from 'crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { mockTasks } from '@/backend/lib/mockTasks';
import type {
  Task,
  TaskInput,
  TaskUpdateInput,
} from '@/backend/types/task';

const dataFilePath = path.join(
  process.cwd(),
  'src',
  'backend',
  'data',
  'tasks.json'
);
const dataDirectoryPath = path.dirname(dataFilePath);

function cloneTasks(list: Task[]) {
  return list.map((task) => ({ ...task }));
}

function ensureDataFile() {
  if (!existsSync(dataDirectoryPath)) {
    mkdirSync(dataDirectoryPath, { recursive: true });
  }

  if (!existsSync(dataFilePath)) {
    writeFileSync(dataFilePath, JSON.stringify(mockTasks, null, 2), 'utf-8');
  }
}

function writeTasksToFile(tasks: Task[]) {
  ensureDataFile();
  writeFileSync(dataFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

function readTasksFromFile() {
  ensureDataFile();

  try {
    const rawContent = readFileSync(dataFilePath, 'utf-8');
    const parsedTasks = JSON.parse(rawContent) as unknown;

    if (!Array.isArray(parsedTasks)) {
      throw new Error('Formato inválido no arquivo de tarefas.');
    }

    return cloneTasks(parsedTasks as Task[]);
  } catch {
    const fallbackTasks = cloneTasks(mockTasks);
    writeTasksToFile(fallbackTasks);
    return fallbackTasks;
  }
}

export async function getTasks() {
  return Promise.resolve(readTasksFromFile());
}

export async function getTaskById(id: string) {
  const tasks = readTasksFromFile();
  const task = tasks.find((item) => item.id === id);
  return Promise.resolve(task ?? null);
}

export async function addTask(input: TaskInput) {
  const tasks = readTasksFromFile();
  const task: Task = {
    id: randomUUID(),
    title: input.title.trim(),
    description: input.description.trim(),
    completed: false,
  };

  const updatedTasks = [task, ...tasks];
  writeTasksToFile(updatedTasks);
  return Promise.resolve({ ...task });
}

export async function updateTask(id: string, updates: TaskUpdateInput) {
  const tasks = readTasksFromFile();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return Promise.resolve(null);
  }

  const currentTask = tasks[index];
  const updatedTask: Task = {
    ...currentTask,
    ...(updates.title !== undefined ? { title: updates.title.trim() } : {}),
    ...(updates.description !== undefined
      ? { description: updates.description.trim() }
      : {}),
    ...(updates.completed !== undefined
      ? { completed: updates.completed }
      : {}),
  };

  tasks[index] = updatedTask;
  writeTasksToFile(tasks);
  return Promise.resolve({ ...updatedTask });
}

export async function deleteTask(id: string) {
  const tasks = readTasksFromFile();
  const exists = tasks.some((task) => task.id === id);

  if (!exists) {
    return Promise.resolve(false);
  }

  writeTasksToFile(tasks.filter((task) => task.id !== id));
  return Promise.resolve(true);
}

export function resetTasks() {
  writeTasksToFile(cloneTasks(mockTasks));
}
