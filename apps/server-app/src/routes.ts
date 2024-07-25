import { mountRouters, SetupRouterFunction } from '@ultron/core-library';
import { Express, Request, Response, Router } from 'express';
import { Container } from 'inversify';

export function setupAppRouter(app: Express, container: Container, ...setupRouters: SetupRouterFunction[]): Router {
  const router: Router = mountRouters(Router(), container, ...setupRouters);

  router.get(`/`, (req: Request, res: Response): void => {
    res.send({ message: 'Hello API' });
  });

  return router;
}
