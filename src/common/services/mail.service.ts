import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import appConfig from '../configs/app.config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: object,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }

  async sendVerificationEmail(
    name: string,
    to: string,
    verificationToken: any,
  ) {
    const verifyUrl = `${this.appConfiguration.origin}/authentication/verify-email?token=${verificationToken}&email=${to}`;
    const subject = 'Email Confirmation';
    const template = './verify-email.handlebars';
    const context = {
      name: name,
      verifyUrl: verifyUrl,
    };
    await this.sendMail(to, subject, template, context);
  }

  async sendResetPasswordEmail(name, to, token) {
    const resetUrl = `${this.appConfiguration.origin}/authentication/reset-password?token=${token}&email=${to}`;
    const subject = 'Reset Password';
    const template = './forget-password.handlebars';
    const context = {
      name: name,
      resetUrl: resetUrl,
    };
    await this.sendMail(to, subject, template, context);
  }
}
