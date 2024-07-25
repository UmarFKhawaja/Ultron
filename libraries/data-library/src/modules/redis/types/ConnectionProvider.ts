import { Redis as Connection } from 'ioredis';

export type ConnectionProvider = () => Promise<Connection>;
