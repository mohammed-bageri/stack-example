import { Controller, Req, UseGuards } from '@nestjs/common';
import { EmailVerifiedGuard } from 'src/auth/authorization/guards/email-verified.guard';
import { AuthType } from 'src/auth/authentication/enums/auth-type.enum';
import { Auth } from 'src/auth/authentication/decorators/auth.decorator';
import { Permissions } from 'src/auth/authorization/decorators/permissions.decorator';
import { PostService } from './post.service';
import { Permission } from '@prisma/client';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';

@Auth(AuthType.JWT)
@UseGuards(EmailVerifiedGuard)
@Controller()
export class PostController {
  constructor(private postService: PostService) {}

  @Permissions(Permission.CREATE_POST)
  @TsRestHandler(contract.posts.createPost)
  create() {
    return tsRestHandler(contract.posts.createPost, async ({ body }) => {
      return this.postService.create(body);
    });
  }

  @Permissions(Permission.READ_POST)
  @TsRestHandler(contract.posts.getPosts, { jsonQuery: true })
  getAll(@Req() req: Request) {
    return tsRestHandler(contract.posts.getPosts, async ({ query }) => {
      return this.postService.getAll(query, req.url);
    });
  }

  @Permissions(Permission.READ_POST)
  @TsRestHandler(contract.posts.getPost)
  getOne() {
    return tsRestHandler(contract.posts.getPost, async ({ params }) => {
      return this.postService.getOne(params.id);
    });
  }

  @Permissions(Permission.UPDATE_POST)
  @TsRestHandler(contract.posts.updatePost)
  update() {
    return tsRestHandler(
      contract.posts.updatePost,
      async ({ params, body }) => {
        return this.postService.update(params.id, body);
      },
    );
  }

  @Permissions(Permission.DELETE_POST)
  @TsRestHandler(contract.posts.deletePost)
  delete() {
    return tsRestHandler(contract.posts.deletePost, async ({ params }) => {
      return this.postService.delete(params.id);
    });
  }
}
