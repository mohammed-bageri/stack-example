import { Permission } from '@prisma/client';

export interface ActiveUserData {
  sub: string;
  email: string;
  verified: boolean | null;
  permissions: Permission[];
}
