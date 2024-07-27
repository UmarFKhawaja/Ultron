import 'reflect-metadata';
import { populateContainer } from '@ultron/core-library';
import { defineCerbosModule, defineMySQLModule, defineRedisModule } from '@ultron/data-library';
import express, { Express } from 'express';
import { Container } from 'inversify';
import { APP_CONSTANTS } from './constants';
import { setupAppMiddleware } from './middlewares';
import { defineAppModule, setupAuthMiddleware, setupAuthRouter } from './modules';
import { setupAppRouter } from './routes';

process.nextTick(async (): Promise<void> => {
  const container: Container = populateContainer(
    new Container(),
    defineCerbosModule,
    defineMySQLModule,
    defineRedisModule,
    defineAppModule
  );

  const prefix: string = 'api';

  const app: Express = setupAppMiddleware(express(), container, setupAuthMiddleware);

  app.use(`/${prefix}`, setupAppRouter(app, container, setupAuthRouter));

  app.listen(APP_CONSTANTS.Settings.port, APP_CONSTANTS.Settings.host, (): void => {
    console.log(`🚀 Server application is listening at http://${APP_CONSTANTS.Settings.host}:${APP_CONSTANTS.Settings.port}/${prefix}`);
  });
});
