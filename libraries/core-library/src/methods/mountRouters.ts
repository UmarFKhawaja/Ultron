import { Router } from 'express';
import { Container } from 'inversify';
import { SetupRouterFunction } from '../types';

export function mountRouters(router: Router, container: Container, ...setupRouters: SetupRouterFunction[]): Router {
  router = setupRouters
    .reduce(
      (router: Router, setupRouter: SetupRouterFunction) => setupRouter(router, container),
      router
    );

  return router;
}
