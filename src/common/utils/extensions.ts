import { Prisma } from '@prisma/client';

type PaginationOptions = {
  page?: number;
  pageSize?: number;
  url?: string;
  search?: string;
};

export const paginationExtension = Prisma.defineExtension({
  model: {
    $allModels: {
      async paginate<T, A>(
        this: T,
        args?: Prisma.Exact<A, Prisma.Args<T, 'findMany'>> & {
          pagination?: PaginationOptions;
        },
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { pagination, ...operationArgs } = (args ?? {}) as any;

        // Calculate the page.
        const page = args?.pagination?.page ? Number(args.pagination.page) : 1;

        // Calculate the pageSize.
        const pageSize = args?.pagination?.pageSize
          ? Number(args.pagination.pageSize)
          : 10;

        // Calculate the skip.
        const skip = page > 1 ? pageSize * (page - 1) : 0;

        // Run two operations in parallel and get results.
        const [data, total]: [Prisma.Result<T, A, 'findMany'>, number] =
          await Promise.all([
            (this as any).findMany({
              ...operationArgs,
              skip,
              take: pageSize,
            }),
            (this as any).count({ where: (operationArgs as any)?.where }),
          ]);

        const pageCount = Math.ceil(total / pageSize);
        const getUrl = (page: number) => {
          return page >= 1 || page <= pageCount
            ? `${args?.pagination?.url}?page=${page}&limit=${pageSize}` +
                (args?.pagination?.search ? `&${args?.pagination?.search}` : '')
            : null;
        };
        return [
          data,
          {
            total,
            pageSize,
            pageCount,
            currentPage: page,
            firstPage: 1,
            lastPage: pageCount,
            firstPageUrl: getUrl(1),
            lastPageUrl: getUrl(pageCount),
            prevPageUrl: getUrl(page - 1),
            nextPageUrl: getUrl(page + 1),
          },
        ];
      },
    },
  },
});
