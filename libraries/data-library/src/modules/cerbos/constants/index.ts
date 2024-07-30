export const CERBOS_CONSTANTS = {
  Symbols: {
    Providers: {
      GRPCConnectionProvider: 'CERBOS_GRPC_CONNECTION_PROVIDER',
      HTTPConnectionProvider: 'CERBOS_HTTP_CONNECTION_PROVIDER'
    },
    Services: {
      AccessChecker: 'CERBOS_ACCESS_CHECKER'
    }
  },
  Settings: {
    host: process.env['CERBOS_HOST'] || '',
    ports: {
      http: parseInt(process.env['CERBOS_HTTP_PORT'] || '3592'),
      grpc: parseInt(process.env['CERBOS_GRPC_PORT'] || '3593')
    }
  }
};
