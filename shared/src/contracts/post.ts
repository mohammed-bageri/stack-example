import {
  PostCreateInputSchema,
  PostFindManyArgsSchema,
  PostSchema,
  PostUpdateInputSchema,
} from '../types';
import {
  QuerySchemaGenerator,
  ResponseSchemaGenerator,
  ResponseStatus,
  c,
} from '../helpers';
import { z } from 'zod';

export const postContract = c.router(
  {
    createPost: {
      method: 'POST',
      path: '/posts',
      responses: {
        201: ResponseSchemaGenerator(PostSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: PostCreateInputSchema,
      summary: 'Create a post',
    },
    getPosts: {
      method: 'GET',
      path: '/posts',
      responses: {
        200: ResponseSchemaGenerator(
          z.array(PostSchema),
          ResponseStatus.Success,
        ),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: QuerySchemaGenerator(PostFindManyArgsSchema),
      summary: 'Get all Posts',
    },
    getPost: {
      method: 'GET',
      path: `/posts/:id`,
      responses: {
        200: ResponseSchemaGenerator(PostSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      summary: 'Get a post by id',
    },
    updatePost: {
      method: 'PATCH',
      path: '/posts/:id',
      responses: {
        200: ResponseSchemaGenerator(PostSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: PostUpdateInputSchema,
      pathParams: z.object({
        id: z.string(),
      }),
      summary: 'Update a post',
    },
    deletePost: {
      method: 'DELETE',
      path: '/posts/:id',
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
      summary: 'Delete a post',
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
