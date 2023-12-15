export interface ApiTasks {
  [id: string]: Task;
}

export interface MutationTask extends Task {
  id: string;
  isDeleting: boolean;
}

export interface Task {
  title: string;
  isDone: boolean;
}

export interface DeletingTask {
  index: number | null,
  id: string | null,
}

