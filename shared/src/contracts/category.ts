import {
  CategoryCreateInputSchema,
  CategoryFindManyArgsSchema,
  CategorySchema,
  CategoryUpdateInputSchema,
} from '../types';
import {
  QuerySchemaGenerator,
  ResponseSchemaGenerator,
  ResponseStatus,
  c,
} from '../helpers';
import { z } from 'zod';

export const categoryContract = c.router(
  {
    createCategory: {
      method: 'POST',
      path: '/categories',
      responses: {
        201: ResponseSchemaGenerator(CategorySchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: CategoryCreateInputSchema,
      summary: 'Create a category',
    },
    getCategories: {
      method: 'GET',
      path: '/categories',
      responses: {
        200: ResponseSchemaGenerator(
          z.array(CategorySchema),
          ResponseStatus.Success,
        ),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      headers: z.object({
        pagination: z.string().optional(),
      }),
      query: QuerySchemaGenerator(CategoryFindManyArgsSchema),
      summary: 'Get all Categorys',
    },
    getCategory: {
      method: 'GET',
      path: `/categories/:id`,
      responses: {
        200: ResponseSchemaGenerator(CategorySchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      summary: 'Get a category by id',
    },
    updateCategory: {
      method: 'PATCH',
      path: '/categories/:id',
      responses: {
        200: ResponseSchemaGenerator(CategorySchema, ResponseStatus.Success),
        401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        403: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        404: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
        500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
      },
      body: CategoryUpdateInputSchema,
      pathParams: z.object({
        id: z.string(),
      }),
      summary: 'Update a category',
    },
    deleteCategory: {
      method: 'DELETE',
      path: '/categories/:id',
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
      summary: 'Delete a category',
    },
  },
  {
    baseHeaders: z.object({
      authorization: z.string(),
    }),
  },
);
