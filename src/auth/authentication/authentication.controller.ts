import { Controller, Req } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type.enum';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { contract } from '@app/shared';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserData } from './interfaces/active-user-data.interface';

@Controller()
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Auth(AuthType.None)
  @TsRestHandler(contract.authentication.signUp)
  async signUp() {
    return tsRestHandler(contract.authentication.signUp, async ({ body }) => {
      return this.authenticationService.signUp(body);
    });
  }

  @Auth(AuthType.Local)
  @TsRestHandler(contract.authentication.signIn)
  async signIn(@Req() req) {
    return tsRestHandler(contract.authentication.signIn, async () => {
      return this.authenticationService.signIn(req.user);
    });
  }

  @Auth(AuthType.JWT)
  @TsRestHandler(contract.authentication.signOut)
  async signOut() {
    return tsRestHandler(contract.authentication.signOut, async () => {
      return this.authenticationService.signOut();
    });
  }

  @Auth(AuthType.JWT)
  @TsRestHandler(contract.authentication.profile)
  async profile(@ActiveUser() user: ActiveUserData) {
    return tsRestHandler(contract.authentication.profile, async () => {
      return this.authenticationService.profile(user.sub);
    });
  }
}
