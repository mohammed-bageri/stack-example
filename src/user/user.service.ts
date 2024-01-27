import { User, UserCreateInput, UserUpdateInput } from '@app/shared';
import { ResponseStatus } from '@app/shared/helpers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { HashingService } from 'src/common/services/hashing.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { paginationExtension } from 'src/common/utils/extensions';
import { generateResponse } from 'src/common/utils/response.util';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private hashingService: HashingService,
  ) {}

  async create(body: UserCreateInput) {
    const { password, ...rest } = body;
    const pwd = await this.hashingService.hash(password);
    rest.verified = true;
    const result = await this.prismaService.user.create({
      data: {
        password: pwd,
        verified: true,
        ...rest,
      },
    });

    return generateResponse<User>(
      201,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async getAll(
    query: {
      page?: number | undefined;
      limit?: number | undefined;
      search?: Prisma.UserFindManyArgs<DefaultArgs> | undefined;
    },
    url: string,
  ) {
    const [data, meta] = await this.prismaService
      .$extends(paginationExtension)
      .user.paginate({
        pagination: {
          page: query.page,
          pageSize: query.limit,
          url: url,
        },
        ...query.search,
      });
    return generateResponse<User[]>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      data as User[],
      meta,
    );
  }

  async getOne(id: string) {
    const result = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
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

  async update(id: string, body: UserUpdateInput) {
    const { password, ...rest } = body;
    const pwd = password
      ? { password: await this.hashingService.hash(password.toString()) }
      : {};
    const result = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: { ...pwd, ...rest },
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
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

  async delete(id: string) {
    const result = await this.prismaService.user.delete({
      where: {
        id: id,
      },
      include: {
        Posts: true,
        Comments: true,
      },
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
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
