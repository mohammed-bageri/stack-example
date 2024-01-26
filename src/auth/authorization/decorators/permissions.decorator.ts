import { SetMetadata } from '@nestjs/common';
import { PERMISSIONS_KEY } from '../constants/authorization.constants';
import { Permission } from '@prisma/client';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
