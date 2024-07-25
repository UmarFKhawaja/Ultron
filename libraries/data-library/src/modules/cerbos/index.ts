import { AccessService, DefineModuleFunction } from '@ultron/core-library';
import { Container } from 'inversify';
import { CERBOS_CONSTANTS } from './constants';
import { provideGRPCConnection, provideHTTPConnection } from './methods';
import { CerbosAccessService } from './services';
import { GRPCConnectionProvider, HTTPConnectionProvider } from './types';

export { CERBOS_CONSTANTS } from './constants';

export const defineCerbosModule: DefineModuleFunction = (container: Container): Container => {
  container.bind<GRPCConnectionProvider>(CERBOS_CONSTANTS.Symbols.Providers.GRPCConnectionProvider).toProvider(provideGRPCConnection);
  container.bind<HTTPConnectionProvider>(CERBOS_CONSTANTS.Symbols.Providers.HTTPConnectionProvider).toProvider(provideHTTPConnection);

  container.bind<AccessService>(CERBOS_CONSTANTS.Symbols.Services.AccessService).to(CerbosAccessService).inRequestScope();

  return container;
};
