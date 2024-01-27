/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignUpInput, User } from '@app/shared';
import { ResponseStatus } from '@app/shared/helpers';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from 'src/common/services/hashing.service';
import { PrismaService } from 'src/common/services/prisma.service';
import jwtConfig from './configs/jwt.config';
import { ConfigType } from '@nestjs/config';
import { generateResponse } from 'src/common/utils/response.util';
import { generateToken } from './utils/jwt.utils';
import * as crypto from 'crypto';
import { MailService } from 'src/common/services/mail.service';
import { Permission } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
    private jwtService: JwtService,
    private mailService: MailService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user && (await this.hashingService.compare(pass, user.password))) {
      const { password, token, ...result } = user;
      return result;
    }
    return null;
  }

  async signUp(body: SignUpInput) {
    const { password, ...rest } = body;
    const pwd = await this.hashingService.hash(password);
    const token = await this.hashingService.hash(
      crypto.randomBytes(40).toString('hex'),
    );
    const result = await this.prismaService.user.create({
      data: {
        password: pwd,
        token: token,
        verified: false,
        permissions: [
          Permission.CREATE_POST,
          Permission.UPDATE_POST,
          Permission.DELETE_POST,
          Permission.READ_POST,
          Permission.CREATE_COMMENT,
          Permission.UPDATE_COMMENT,
          Permission.DELETE_COMMENT,
          Permission.READ_COMMENT,
        ],
        ...rest,
      },
    });

    if (result) {
      await this.mailService.sendVerificationEmail(
        body.name,
        body.email,
        token,
      );
    }

    return generateResponse<User>(
      201,
      'تم التسجيل بنجاح, الرجاء تأكيد البريد الإلكتروني',
      ResponseStatus.Success,
      result,
    );
  }

  async signIn(body: User) {
    return generateResponse<{
      accessToken: string;
      email: string;
      name: string;
    }>(200, 'تم تسجيل الدخول بنجاح', ResponseStatus.Success, {
      accessToken: await generateToken(
        body,
        this.jwtService,
        this.jwtConfiguration,
      ),
      email: body.email,
      name: body.name,
    });
  }

  async signOut() {
    return generateResponse<null>(
      200,
      'تم تسجيل الخروج بنجاح',
      ResponseStatus.Success,
      null,
    );
  }
  async profile(id: string) {
    const result = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'الحساب غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }

    return generateResponse<User>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }
}
