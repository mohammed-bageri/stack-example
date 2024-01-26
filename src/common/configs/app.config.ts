import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  return {
    origin: process.env.ORIGIN || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME || 'AppName',
    databaseUrl:
      process.env.DATABASE_URL ||
      'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public',
    nodemailerEmail: process.env.NODEMAILER_EMAIL || 'example@zoho.com',
    nodemailerPassword: process.env.NODEMAILER_PASSWORD || '123456789',
    nodemailerService: process.env.NODEMAILER_SERVICE || 'Zoho',
  };
});
