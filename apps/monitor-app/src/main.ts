import 'reflect-metadata';
import { populateContainer, MessageWatcher, TaskHandler } from '@ultron/core-library';
import { defineRedisModule, REDIS_CONSTANTS } from '@ultron/data-library';
import { defineMJMLModule, defineNodemailerModule } from '@ultron/services-library';
import { Container } from 'inversify';
import { APP_CONSTANTS } from './constants';
import { defineAppModule } from './modules';

process.nextTick(async (): Promise<void> => {
  const container: Container = populateContainer(
    new Container(),
    defineRedisModule,
    defineMJMLModule,
    defineNodemailerModule,
    defineAppModule
  );

  const messageWatcher: MessageWatcher = container.get<MessageWatcher>(REDIS_CONSTANTS.Symbols.Services.MessageWatcher);
  const taskHandler: TaskHandler = container.get<TaskHandler>(APP_CONSTANTS.Symbols.Services.TaskHandler);

  await messageWatcher.watchForMessages(taskHandler.handleTask.bind(taskHandler));

  console.log(`🚀 Monitor application is running`);
});
