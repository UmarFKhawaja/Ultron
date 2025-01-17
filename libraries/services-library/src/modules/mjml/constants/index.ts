import {
  COMPLETE_EMAIL_ADDRESS_CHANGE,
  CONFIRM_EMAIL_ADDRESS_CHANGE,
  LOGIN_WITH_MAGIC_LOGIN_MAIL,
  REGISTER_MAIL,
  RESET_PASSWORD_MAIL
} from '../templates';

export const MJML_CONSTANTS = {
  Symbols: {
    Services: {
      MailFormatter: 'MJML_MAIL_FORMATTER'
    }
  },
  Settings: {
    FrontendPublicURL: 'https://jadoo.dev',
    Sender: 'Jadoo <info@jadoo.dev>'
  },
  Templates: {
    RegisterMail: REGISTER_MAIL,
    LoginWithMagicLogin: LOGIN_WITH_MAGIC_LOGIN_MAIL,
    ResetPassword: RESET_PASSWORD_MAIL,
    ConfirmEmailAddressChange: CONFIRM_EMAIL_ADDRESS_CHANGE,
    CompleteEmailAddressChange: COMPLETE_EMAIL_ADDRESS_CHANGE
  }
};
