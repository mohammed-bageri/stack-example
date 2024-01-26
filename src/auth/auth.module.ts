import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [AuthenticationModule, AuthorizationModule, VerificationModule],
})
export class AuthModule {}
