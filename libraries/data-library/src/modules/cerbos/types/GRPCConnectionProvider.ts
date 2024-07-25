import { GRPC as GRPCConnection } from '@cerbos/grpc';

export type GRPCConnectionProvider = () => Promise<GRPCConnection>;
