import { HTTP as HTTPConnection } from '@cerbos/http';
import { CERBOS_CONSTANTS } from '../constants';
import { HTTPConnectionProvider } from '../types';

export function provideHTTPConnection(): HTTPConnectionProvider {
  return async (): Promise<HTTPConnection> => new HTTPConnection(`${CERBOS_CONSTANTS.Settings.host}:${CERBOS_CONSTANTS.Settings.ports.http}`, {});
}
