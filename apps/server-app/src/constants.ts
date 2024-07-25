export const APP_CONSTANTS = {
  Symbols: {
  },
  Settings: {
    host: process.env.HOST ?? 'localhost',
    port: process.env.PORT ? Number(process.env.PORT) : 3180
  }
};
