import { Container } from 'inversify';
import { DefineModuleFunction } from '../types';

export function populateContainer(container: Container, ...defineModules: DefineModuleFunction[]): Container {
  container = defineModules
    .reduce(
      (container: Container, defineModule: DefineModuleFunction) => defineModule(container),
      container
    );

  return container;
}
