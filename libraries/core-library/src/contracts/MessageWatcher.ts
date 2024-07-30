import { Task } from '../types';

export interface MessageWatcher {
  watchForMessages(handleTask: (task: Task) => Promise<void>): Promise<void>;
}
