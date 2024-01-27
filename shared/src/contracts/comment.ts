import {
  CommentCreateInputSchema,
  CommentFindManyArgsSchema,
  CommentSchema,
  CommentUpdateInputSchema,
} from '../types';
import {
  QuerySchemaGenerator,
  ResponseSchemaGenerator,
  ResponseStatus,
  c,
} from '../helpers';
import { z } from 'zod';

export const commentContract = c.router(
  {
    createComment: {
      method: 'POST',
      path: '/comments',
      responses: {
        201: ResponseSchemaGenerator(CommentSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: CommentCreateInputSchema,
      summary: 'Create a comment',
    },
    getComments: {
      method: 'GET',
      path: '/comments',
      responses: {
        200: ResponseSchemaGenerator(
          z.array(CommentSchema),
          ResponseStatus.Success,
        ),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: QuerySchemaGenerator(CommentFindManyArgsSchema),
      summary: 'Get all Comments',
    },
    getComment: {
      method: 'GET',
      path: `/comments/:id`,
      responses: {
        200: ResponseSchemaGenerator(CommentSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      summary: 'Get a comment by id',
    },
    updateComment: {
      method: 'PATCH',
      path: '/comments/:id',
      responses: {
        200: ResponseSchemaGenerator(CommentSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: CommentUpdateInputSchema,
      pathParams: z.object({
        id: z.string(),
      }),
      summary: 'Update a comment',
    },
    deleteComment: {
      method: 'DELETE',
      path: '/comments/:id',
      responses: {
        200: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: z.object({}),
      pathParams: z.object({
        id: z.string(),
      }),
      summary: 'Delete a comment',
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
