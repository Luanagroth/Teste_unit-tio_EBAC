import { TaskBoard } from '@/components/TaskBoard';
import { getTasks } from '@/lib/taskStore';

export default async function HomePage() {
  const tasks = await getTasks();

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Organizacao diaria</p>
        <h1>Lista de tarefas com Next.js 15</h1>
        <p className="hero-copy">
          Carregamos as tarefas em um Server Component e deixamos a interacao
          acontecer no cliente, com testes cobrindo os fluxos principais.
        </p>
      </section>

      <TaskBoard initialTasks={tasks} />
    </main>
  );
}
