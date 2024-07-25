import 'reflect-metadata';
import { createContainer, MessageService, TaskService } from '@ultron/core-library';
import { defineRedisModule, REDIS_CONSTANTS } from '@ultron/data-library';
import { defineMJMLModule, defineNodemailerModule } from '@ultron/services-library';
import { Container } from 'inversify';
import { APP_CONSTANTS } from './constants';
import { defineAppModule } from './modules';

process.nextTick(async (): Promise<void> => {
  const container: Container = createContainer(
    new Container(),
    defineRedisModule,
    defineMJMLModule,
    defineNodemailerModule,
    defineAppModule
  );

  const messageService: MessageService = container.get<MessageService>(REDIS_CONSTANTS.Symbols.Services.MessageService);
  const taskService: TaskService = container.get<TaskService>(APP_CONSTANTS.Symbols.Services.TaskService);

  await messageService.watchForMessages(taskService.handleTask.bind(taskService));

  console.log(`🚀 MonitorApp is running`);
});
