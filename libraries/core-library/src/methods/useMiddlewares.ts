import { Express } from 'express';
import { Container } from 'inversify';
import { SetupMiddlewareFunction } from '../types';

export function useMiddlewares(app: Express, container: Container, ...setupMiddlewares: SetupMiddlewareFunction[]): Express {
  app = setupMiddlewares
    .reduce(
      (app: Express, setupMiddleware: SetupMiddlewareFunction) => setupMiddleware(app, container),
      app
    );

  return app;
}
