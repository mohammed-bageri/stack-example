import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { MetaResultSchema } from '../types';
type ContractInstance = ReturnType<typeof initContract>;
export const c: ContractInstance = initContract();

export enum ResponseStatus {
  Success,
  Fail,
  Error,
}

export const ResponseSchemaGenerator = (
  schema: z.ZodSchema,
  status: ResponseStatus,
) => {
  switch (status) {
    case ResponseStatus.Success:
      return z.object({
        message: z.string(),
        status: z.nativeEnum(ResponseStatus).default(ResponseStatus.Success),
        data: schema,
        meta: MetaResultSchema,
      });
    case ResponseStatus.Fail:
      return z.object({
        message: z.string(),
        status: z.nativeEnum(ResponseStatus).default(ResponseStatus.Fail),
        data: schema,
      });
    case ResponseStatus.Error:
      return z.object({
        message: z.string(),
        status: z.nativeEnum(ResponseStatus).default(ResponseStatus.Error),
        data: schema,
        code: z.string().optional(),
      });
    default:
      return z.object({
        message: z.string(),
        status: z.nativeEnum(ResponseStatus).default(ResponseStatus.Success),
        data: z.null(),
      });
  }
};

export const QuerySchemaGenerator = (schema: z.ZodSchema) => {
  return z.object({
    page: z.string().transform(Number).optional(),
    limit: z.string().transform(Number).optional(),
    search: schema.optional(),
  });
};
