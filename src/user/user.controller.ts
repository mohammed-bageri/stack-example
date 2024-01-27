import { Controller, Req, UseGuards } from '@nestjs/common';
import { EmailVerifiedGuard } from 'src/auth/authorization/guards/email-verified.guard';
import { AuthType } from 'src/auth/authentication/enums/auth-type.enum';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { Permissions } from 'src/auth/authorization/decorators/permissions.decorator';
import { UserService } from './user.service';
import { Permission } from '@prisma/client';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';

@Auth(AuthType.JWT)
@UseGuards(EmailVerifiedGuard)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Permissions(Permission.CREATE_USER)
  @TsRestHandler(contract.users.createUser)
  create() {
    return tsRestHandler(contract.users.createUser, async ({ body }) => {
      return this.userService.create(body);
    });
  }

  @Permissions(Permission.READ_USER)
  @TsRestHandler(contract.users.getUsers, { jsonQuery: true })
  getAll(@Req() req: Request) {
    return tsRestHandler(contract.users.getUsers, async ({ query }) => {
      return this.userService.getAll(query, req.url);
    });
  }

  @Permissions(Permission.READ_USER)
  @TsRestHandler(contract.users.getUser)
  getOne() {
    return tsRestHandler(contract.users.getUser, async ({ params }) => {
      return this.userService.getOne(params.id);
    });
  }

  @Permissions(Permission.UPDATE_USER)
  @TsRestHandler(contract.users.updateUser)
  update() {
    return tsRestHandler(
      contract.users.updateUser,
      async ({ params, body }) => {
        return this.userService.update(params.id, body);
      },
    );
  }

  @Permissions(Permission.DELETE_USER)
  @TsRestHandler(contract.users.deleteUser)
  delete() {
    return tsRestHandler(contract.users.deleteUser, async ({ params }) => {
      return this.userService.delete(params.id);
    });
  }
}
