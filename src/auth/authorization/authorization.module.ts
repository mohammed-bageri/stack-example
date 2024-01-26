import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from './guards/permissions.guard';
import { Module } from '@nestjs/common';
import { EmailVerifiedGuard } from './guards/email-verified.guard';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    EmailVerifiedGuard,
  ],
  exports: [EmailVerifiedGuard],
})
export class AuthorizationModule {}
