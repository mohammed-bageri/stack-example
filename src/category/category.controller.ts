import { Controller, Req, UseGuards } from '@nestjs/common';
import { EmailVerifiedGuard } from 'src/auth/authorization/guards/email-verified.guard';
import { AuthType } from 'src/auth/authentication/enums/auth-type.enum';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { Permissions } from 'src/auth/authorization/decorators/permissions.decorator';
import { CategoryService } from './category.service';
import { Permission } from '@prisma/client';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';

@Auth(AuthType.JWT)
@UseGuards(EmailVerifiedGuard)
@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Permissions(Permission.CREATE_CATEGORY)
  @TsRestHandler(contract.categories.createCategory)
  create() {
    return tsRestHandler(
      contract.categories.createCategory,
      async ({ body }) => {
        return this.categoryService.create(body);
      },
    );
  }

  @Permissions(Permission.READ_CATEGORY)
  @TsRestHandler(contract.categories.getCategories, { jsonQuery: true })
  getAll(@Req() req: Request) {
    return tsRestHandler(
      contract.categories.getCategories,
      async ({ query }) => {
        return this.categoryService.getAll(query, req.url);
      },
    );
  }

  @Permissions(Permission.READ_CATEGORY)
  @TsRestHandler(contract.categories.getCategory)
  getOne() {
    return tsRestHandler(
      contract.categories.getCategory,
      async ({ params }) => {
        return this.categoryService.getOne(params.id);
      },
    );
  }

  @Permissions(Permission.UPDATE_CATEGORY)
  @TsRestHandler(contract.categories.updateCategory)
  update() {
    return tsRestHandler(
      contract.categories.updateCategory,
      async ({ params, body }) => {
        return this.categoryService.update(params.id, body);
      },
    );
  }

  @Permissions(Permission.DELETE_CATEGORY)
  @TsRestHandler(contract.categories.deleteCategory)
  delete() {
    return tsRestHandler(
      contract.categories.deleteCategory,
      async ({ params }) => {
        return this.categoryService.delete(params.id);
      },
    );
  }
}
