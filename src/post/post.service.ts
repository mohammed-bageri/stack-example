import { Post, PostCreateInput, PostUpdateInput } from '@app/shared';
import { ResponseStatus } from '@app/shared/helpers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/services/prisma.service';
import { paginationExtension } from 'src/common/utils/extensions';
import { generateResponse } from 'src/common/utils/response.util';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async create(body: PostCreateInput) {
    const result = await this.prismaService.post.create({
      data: body,
    });

    return generateResponse<Post>(
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
      search?: Prisma.PostFindManyArgs<DefaultArgs> | undefined;
    },
    url: string,
  ) {
    const [data, meta] = await this.prismaService
      .$extends(paginationExtension)
      .post.paginate({
        pagination: {
          page: query.page,
          pageSize: query.limit,
          url: url,
        },
        ...query.search,
      });
    return generateResponse<Post[]>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      data as Post[],
      meta,
    );
  }

  async getOne(id: string) {
    const result = await this.prismaService.post.findUnique({
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

    return generateResponse<Post>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async update(id: string, body: PostUpdateInput) {
    const result = await this.prismaService.post.update({
      where: {
        id: id,
      },
      data: body,
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'المستخدم غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }

    return generateResponse<Post>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async delete(id: string) {
    const result = await this.prismaService.post.delete({
      where: {
        id: id,
      },
      include: {
        Author: true,
        Categories: true,
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

    return generateResponse<Post>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }
}
