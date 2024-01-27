import {
  Category,
  CategoryCreateInput,
  CategoryUpdateInput,
} from '@app/shared';
import { ResponseStatus } from '@app/shared/helpers';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/common/services/prisma.service';
import { paginationExtension } from 'src/common/utils/extensions';
import { generateResponse } from 'src/common/utils/response.util';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}

  async create(body: CategoryCreateInput) {
    const result = await this.prismaService.category.create({
      data: body,
    });

    return generateResponse<Category>(
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
      search?: Prisma.CategoryFindManyArgs<DefaultArgs> | undefined;
    },
    url: string,
  ) {
    const [data, meta] = await this.prismaService
      .$extends(paginationExtension)
      .category.paginate({
        pagination: {
          page: query.page,
          pageSize: query.limit,
          url: url,
        },
        ...query.search,
      });
    return generateResponse<Category[]>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      data as Category[],
      meta,
    );
  }

  async getOne(id: string) {
    const result = await this.prismaService.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!result) {
      return generateResponse<null>(
        404,
        'التصنيف غير موجود',
        ResponseStatus.Fail,
        null,
      );
    }

    return generateResponse<Category>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async update(id: string, body: CategoryUpdateInput) {
    const result = await this.prismaService.category.update({
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

    return generateResponse<Category>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }

  async delete(id: string) {
    const result = await this.prismaService.category.delete({
      where: {
        id: id,
      },
      include: {
        Posts: true,
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

    return generateResponse<Category>(
      200,
      'تمت العملية بنجاح',
      ResponseStatus.Success,
      result,
    );
  }
}
