import { Controller } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { AuthType } from '../authentication/enums/auth-type.enum';
import { Auth } from '../authentication/decorators/auth.decorator';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';

@Auth(AuthType.None)
@Controller()
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @TsRestHandler(contract.verification.forgotPassword)
  async forgotPassword() {
    return tsRestHandler(
      contract.verification.forgotPassword,
      async ({ body }) => {
        return this.verificationService.forgotPassword(body);
      },
    );
  }

  @TsRestHandler(contract.verification.resetPassword)
  async resetPassword() {
    return tsRestHandler(
      contract.verification.resetPassword,
      async ({ body }) => {
        return this.verificationService.resetPassword(body);
      },
    );
  }

  @TsRestHandler(contract.verification.verifyEmail)
  async verifyEmail() {
    return tsRestHandler(
      contract.verification.verifyEmail,
      async ({ body }) => {
        return this.verificationService.verifyEmail(body);
      },
    );
  }
}
