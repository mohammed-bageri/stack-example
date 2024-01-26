import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { REQUEST_USER_KEY } from 'src/auth/authentication/constants/authentication.constant';
import { ActiveUserData } from 'src/auth/authentication/interfaces/active-user-data.interface';

@Injectable()
export class EmailVerifiedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user: ActiveUserData = context.switchToHttp().getRequest()[
      REQUEST_USER_KEY
    ];
    return user.verified ?? false;
  }
}
