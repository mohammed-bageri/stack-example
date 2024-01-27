import { Controller, Req, UseGuards } from '@nestjs/common';
import { EmailVerifiedGuard } from 'src/auth/authorization/guards/email-verified.guard';
import { AuthType } from 'src/auth/authentication/enums/auth-type.enum';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { Permissions } from 'src/auth/authorization/decorators/permissions.decorator';
import { CommentService } from './comment.service';
import { Permission } from '@prisma/client';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';

@Auth(AuthType.JWT)
@UseGuards(EmailVerifiedGuard)
@Controller()
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Permissions(Permission.CREATE_COMMENT)
  @TsRestHandler(contract.comments.createComment)
  create() {
    return tsRestHandler(contract.comments.createComment, async ({ body }) => {
      return this.commentService.create(body);
    });
  }

  @Permissions(Permission.READ_COMMENT)
  @TsRestHandler(contract.comments.getComments, { jsonQuery: true })
  getAll(@Req() req: Request) {
    return tsRestHandler(contract.comments.getComments, async ({ query }) => {
      return this.commentService.getAll(query, req.url);
    });
  }

  @Permissions(Permission.READ_COMMENT)
  @TsRestHandler(contract.comments.getComment)
  getOne() {
    return tsRestHandler(contract.comments.getComment, async ({ params }) => {
      return this.commentService.getOne(params.id);
    });
  }

  @Permissions(Permission.UPDATE_COMMENT)
  @TsRestHandler(contract.comments.updateComment)
  update() {
    return tsRestHandler(
      contract.comments.updateComment,
      async ({ params, body }) => {
        return this.commentService.update(params.id, body);
      },
    );
  }

  @Permissions(Permission.DELETE_COMMENT)
  @TsRestHandler(contract.comments.deleteComment)
  delete() {
    return tsRestHandler(
      contract.comments.deleteComment,
      async ({ params }) => {
        return this.commentService.delete(params.id);
      },
    );
  }
}
