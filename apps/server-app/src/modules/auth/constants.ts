export const AUTH_CONSTANTS = {
  Symbols: {
    Services: {
      CoreManager: Symbol.for('CoreManager'),
      JWTManager: Symbol.for('JWTManager'),
      ProfileExtractor: Symbol.for('ProfileExtractor'),
      TokenManager: Symbol.for('TokenManager'),
      URLFormatter: Symbol.for('URLFormatter'),
      UserManager: Symbol.for('UserManager'),
      VerificationRequestManager: Symbol.for('VerificationRequestManager'),
      FacebookStrategyProvider: Symbol.for('FacebookStrategyProvider'),
      GoogleStrategyProvider: Symbol.for('GoogleStrategyProvider'),
      JWTStrategyProvider: Symbol.for('JWTStrategyProvider'),
      MagicLoginStrategyProvider: Symbol.for('MagicLoginStrategyProvider'),
      PasswordStrategyProvider: Symbol.for('PasswordStrategyProvider')
    }
  },
  Names: {
    Strategies: {
      FacebookStrategy: Symbol.for('FacebookStrategy'),
      GoogleStrategy: Symbol.for('GoogleStrategy'),
      JWTStrategy: Symbol.for('JWTStrategy'),
      MagicLoginStrategy: Symbol.for('MagicLoginStrategy'),
      PasswordStrategy: Symbol.for('PasswordStrategy')
    }
  },
  Settings: {
    Session: {
      secret: process.env.AUTH_SESSION_SECRET || ''
    }
  },
  Strategies: {
    Password: {
    },
    MagicLogin: {
      secret: process.env.AUTH_STRATEGY_MAGIC_LOGIN_SECRET || '',
      expiresIn: process.env.AUTH_STRATEGY_MAGIC_LOGIN_EXPIRES_IN || '10m',
      baseURL: process.env.AUTH_STRATEGY_MAGIC_LOGIN_BASE_URL || 'http://localhost:2080',
      acceptPath: '/app/accept/magic-login'
    },
    JWT: {
      secret: process.env.AUTH_STRATEGY_JWT_SECRET || '',
      expiresIn: process.env.AUTH_STRATEGY_JWT_EXPIRES_IN || '10m'
    },
    Facebook: {
      clientID: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.AUTH_STRATEGY_FACEBOOK_CLIENT_SECRET || '',
      acceptURL: process.env.AUTH_STRATEGY_FACEBOOK_ACCEPT_URL || 'http://localhost:2180',
      acceptPath: '/api/auth/accept/facebook',
      redirectURL: process.env.AUTH_STRATEGY_FACEBOOK_REDIRECT_URL || 'http://localhost:2080'
    },
    Google: {
      clientID: process.env.AUTH_STRATEGY_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.AUTH_STRATEGY_GOOGLE_CLIENT_SECRET || '',
      acceptURL: process.env.AUTH_STRATEGY_GOOGLE_ACCEPT_URL || 'http://localhost:2180',
      acceptPath: '/api/auth/accept/google',
      redirectURL: process.env.AUTH_STRATEGY_GOOGLE_REDIRECT_URL || 'http://localhost:2080'
    }
  },
  Actions: {
    baseURL: process.env.AUTH_ACTIONS_BASE_URL || 'http://localhost:2080',
    ManageProfile: {
      path: (baseURL: string, token: string): string => {
        const url: URL = new URL(`/app/manage-profile`, baseURL);

        if (token) {
          url.searchParams.set('token', token);
        }

        return url.toString();
      }
    },
    ActivateAccount: {
      path: '/app/activate-account'
    },
    RecoverAccount: {
      path: '/app/reset-password'
    },
    ConfirmEmailAddressChange: {
      path: '/app/confirm-email-address-change'
    },
    CompleteEmailAddressChange: {
      path: '/app/complete-email-address-change'
    }
  }
};
