import { SetupMiddlewareFunction, useMiddlewares } from '@ultron/core-library';
import { Express } from 'express';
import { Container } from 'inversify';

export function setupAppMiddleware(app: Express, container: Container, ...setupMiddlewares: SetupMiddlewareFunction[]): Express {
  app = useMiddlewares(app, container, ...setupMiddlewares);

  return app;
}
