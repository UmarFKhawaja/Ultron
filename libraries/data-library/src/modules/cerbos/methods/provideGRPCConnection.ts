import { GRPC as GRPCConnection } from '@cerbos/grpc';
import { CERBOS_CONSTANTS } from '../constants';
import { GRPCConnectionProvider } from '../types';

export function provideGRPCConnection(): GRPCConnectionProvider {
  return async (): Promise<GRPCConnection> => new GRPCConnection(`${CERBOS_CONSTANTS.Settings.host}:${CERBOS_CONSTANTS.Settings.ports.grpc}`, {
    tls: false
  });
}
