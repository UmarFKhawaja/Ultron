import { Router } from 'express';
import { Container } from 'inversify';

export type SetupRouterFunction = (router: Router, container: Container) => Router;
