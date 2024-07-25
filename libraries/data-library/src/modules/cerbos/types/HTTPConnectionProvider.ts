import { HTTP as HTTPConnection } from '@cerbos/http';

export type HTTPConnectionProvider = () => Promise<HTTPConnection>;
