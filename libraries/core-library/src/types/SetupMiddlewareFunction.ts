import { Express } from 'express';
import { Container } from 'inversify';

export type SetupMiddlewareFunction = (app: Express, container: Container) => Express;
