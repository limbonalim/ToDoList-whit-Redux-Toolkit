export interface ApiTasks {
  [id: string]: Task;
}

export interface ApiTask extends Task {
  id: string;
}

export interface Task {
  title: string;
  isDone: boolean;
}

