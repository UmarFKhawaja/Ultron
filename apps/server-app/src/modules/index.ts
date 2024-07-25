import { DefineModuleFunction } from '@ultron/core-library';
import { Container } from 'inversify';
import { defineAuthModule } from './auth';

export * from './auth';

export const defineAppModule: DefineModuleFunction = (container: Container): Container => {
  container = defineAuthModule(container);

  return container;
};
