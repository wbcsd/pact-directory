/* eslint-disable n/no-process-env */

export default {
  NodeEnv: process.env.NODE_ENV ?? "",
  Port: process.env.PORT ?? 0,
  CookieProps: {
    Key: "ExpressGeneratorTs",
    Secret: process.env.COOKIE_SECRET ?? "",
    // Casing to match express cookie options
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH ?? "",
      maxAge: Number(process.env.COOKIE_EXP ?? 0),
      domain: process.env.COOKIE_DOMAIN ?? "",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  Jwt: {
    Secret: process.env.JWT_SECRET ?? "",
    Exp: process.env.COOKIE_EXP ?? "", // exp at the same time as the cookie
  },
  DirectoryDatabase: {
    Host: process.env.DIR_DB_HOST ?? "",
    User: process.env.DIR_DB_USER ?? "",
    Password: process.env.DIR_DB_PASSWORD ?? "",
    Database: process.env.DIR_DB_NAME ?? "",
  },
  EmailNotificationTemplates: {
    Welcome: process.env.EMAIL_WELCOME_TEMPLATE ?? "",
    ResetPassword: process.env.EMAIL_RESET_TEMPLATE ?? "",
  },
  Sendgrid: {
    ApiKey: process.env.SENDGRID_API_KEY ?? "",
    FromEmail: process.env.SENDGRID_FROM_EMAIL ?? "",
  },
} as const;
