import {
  UserCreateInputSchema,
  UserFindManyArgsSchema,
  UserSchema,
  UserUpdateInputSchema,
} from '../types';
import {
  QuerySchemaGenerator,
  ResponseSchemaGenerator,
  ResponseStatus,
  c,
} from '../helpers';
import { z } from 'zod';

export const userContract = c.router(
  {
    createUser: {
      method: 'POST',
      path: '/users',
      responses: {
        201: ResponseSchemaGenerator(UserSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: UserCreateInputSchema,
      summary: 'Create a user',
    },
    getUsers: {
      method: 'GET',
      path: '/users',
      responses: {
        200: ResponseSchemaGenerator(
          z.array(UserSchema),
          ResponseStatus.Success,
        ),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      query: QuerySchemaGenerator(UserFindManyArgsSchema),
      summary: 'Get all Users',
    },
    getUser: {
      method: 'GET',
      path: `/users/:id`,
      responses: {
        200: ResponseSchemaGenerator(UserSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      summary: 'Get a user by id',
    },
    updateUser: {
      method: 'PATCH',
      path: '/users/:id',
      responses: {
        200: ResponseSchemaGenerator(UserSchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: UserUpdateInputSchema,
      pathParams: z.object({
        id: z.string(),
      }),
      summary: 'Update a user',
    },
    deleteUser: {
      method: 'DELETE',
      path: '/users/:id',
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
      summary: 'Delete a user',
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
