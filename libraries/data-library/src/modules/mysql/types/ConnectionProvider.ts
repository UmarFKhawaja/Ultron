import { DataSource as Connection } from 'typeorm';

export type ConnectionProvider = () => Promise<Connection>;
