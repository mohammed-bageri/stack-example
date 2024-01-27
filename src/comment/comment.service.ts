import { Comment, CommentCreateInput, CommentUpdateInput } from '@app/shared';
import { ResponseStatus } from '@app/shared/helpers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/services/prisma.service';
import { paginationExtension } from 'src/common/utils/extensions';
import { generateResponse } from 'src/common/utils/response.util';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async create(body: CommentCreateInput) {
    const result = await this.prismaService.comment.create({
      data: body,
    });

    return generateResponse<Comment>(
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
      search?: Prisma.CommentFindManyArgs<DefaultArgs> | undefined;
    },
    url: string,
  ) {
    const [data, meta] = await this.prismaService
      .$extends(paginationExtension)
      .comment.paginate({
        pagination: {
          page: query.page,
          pageSize: query.limit,
          url: url,
        },
        ...query.search,
      });
    return generateResponse<Comment[]>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      data as Comment[],
      meta,
    );
  }

  async getOne(id: string) {
    const result = await this.prismaService.comment.findUnique({
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

    return generateResponse<Comment>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async update(id: string, body: CommentUpdateInput) {
    const result = await this.prismaService.comment.update({
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

    return generateResponse<Comment>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async delete(id: string) {
    const result = await this.prismaService.comment.delete({
      where: {
        id: id,
      },
      include: {
        Post: true,
        User: true,
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

    return generateResponse<Comment>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }
}
