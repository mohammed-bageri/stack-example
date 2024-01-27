import { ResponseStatus } from '@app/shared/helpers';

export const generateResponse = <T>(
  status: 200 | 201 | 400 | 401 | 403 | 404 | 500,
  message: string,
  type: ResponseStatus,
  data: T,
  meta?: any,
) => {
  return {
    status: status,
    body: {
      message,
      status: type,
      data,
      meta,
    },
  } as const;
};
