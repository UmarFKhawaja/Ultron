import { Task } from '../types';

export interface TaskHandler {
  handleTask(task: Task): Promise<void>;
}
