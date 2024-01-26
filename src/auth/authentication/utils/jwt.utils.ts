import { User } from '@app/shared';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../configs/jwt.config';
import { ConfigType } from '@nestjs/config';

export const generateToken = async (
  user: User,
  jwtService: JwtService,
  jwtConfiguration: ConfigType<typeof jwtConfig>,
) => {
  const accessToken = await signToken<Partial<ActiveUserData>>(
    user.id,
    jwtConfiguration.accessTokenTTL,
    jwtService,
    jwtConfiguration,
    {
      email: user.email,
      verified: user.verified,
      permissions: user.permissions,
    },
  );
  return accessToken;
};

const signToken = async <T>(
  userId: string,
  expiresIn: string,
  jwtService: JwtService,
  jwtConfiguration: ConfigType<typeof jwtConfig>,
  payload?: T,
) => {
  return await jwtService.signAsync(
    {
      sub: userId,
      ...payload,
    },
    {
      audience: jwtConfiguration.audience,
      issuer: jwtConfiguration.issuer,
      secret: jwtConfiguration.secret,
      expiresIn,
    },
  );
};
