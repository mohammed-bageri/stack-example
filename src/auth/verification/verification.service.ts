import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import {
  ForgetPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '@app/shared';
import { HashingService } from 'src/common/services/hashing.service';
import { MailService } from 'src/common/services/mail.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { generateResponse } from 'src/common/utils/response.util';
import { ResponseStatus } from '@app/shared/helpers';

@Injectable()
export class VerificationService {
  constructor(
    private hashingService: HashingService,
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async verifyEmail(verifyEmailDto: VerifyEmailInput) {
    const { token, email } = verifyEmailDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user || !(token == user.token)) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }

    user.verified = true;
    user.token = '';

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return generateResponse<null>(
      200,
      'تم تأكيد البريد الإلكتروني بنجاح',
      ResponseStatus.Success,
      null,
    );
  }

  async forgotPassword(forgotPasswordDto: ForgetPasswordInput) {
    const { email } = forgotPasswordDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }
    const passwordToken = crypto.randomBytes(70).toString('hex');

    user.passwordToken = await this.hashingService.hash(passwordToken);
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    await this.mailService.sendResetPasswordEmail(
      user.name,
      user.email,
      user.passwordToken,
    );
    return generateResponse<null>(
      200,
      'الرجاء التحقق من البريد الإلكتروني لتعديل كلمة المرور',
      ResponseStatus.Success,
      null,
    );
  }

  async resetPassword(resetPasswordDto: ResetPasswordInput) {
    const { token, email, password } = resetPasswordDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user || token != user.passwordToken) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }

    user.password = await this.hashingService.hash(password);
    user.passwordToken = '';
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        ...user,
      },
    });

    return generateResponse<null>(
      200,
      'تمت إعادة تعيين كلمة المرور بنجاح',
      ResponseStatus.Success,
      null,
    );
  }
}
