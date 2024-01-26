import { registerAs } from '@nestjs/config';

export default registerAs('jwt', async () => {
  return {
    secret: process.env.JWT_SECRET || '%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPe',
    audience: process.env.JWT_TOKEN_AUDIENCE || 'localhost:8080',
    issuer: process.env.JWT_TOKEN_ISSUER || 'localhost:8080',
    accessTokenTTL: process.env.JWT_ACCESS_TOKEN_TTL || '1d',
    refreshTokenTTL: process.env.JWT_REFRESH_TOKEN_TTL || '7d',
  };
});
