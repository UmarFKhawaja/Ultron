export const REDIS_CONSTANTS = {
  Symbols: {
    Providers: {
      ConnectionProvider: 'REDIS_CONNECTION_PROVIDER'
    },
    Services: {
      MailSender: 'REDIS_MAIL_SENDER',
      MessageWatcher: 'REDIS_MESSAGE_WATCHER',
      SessionManager: 'REDIS_SESSION_MANAGER'
    }
  },
  Settings: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: parseInt(process.env['REDIS_PORT'] || '6379') || 6379,
    username: process.env['REDIS_USERNAME'] || '',
    password: process.env['REDIS_PASSWORD'] || ''
  },
  Names: {
    Notifications: 'NOTIFICATIONS'
  }
};
