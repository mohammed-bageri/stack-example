import { z } from 'zod';
import {
  ResponseSchemaGenerator as ResponseSchemaGenerator,
  ResponseStatus,
  c,
} from '../helpers';
import { SignInInputSchema, SignUpInputSchema, UserSchema } from '../types';

export const authenticationContract = c.router({
  signUp: {
    method: 'POST',
    path: '/authentication/sign-up',
    responses: {
      201: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    body: SignUpInputSchema,
    summary: 'Sign Up',
  },
  signIn: {
    method: 'POST',
    path: '/authentication/sign-in',
    responses: {
      200: ResponseSchemaGenerator(
        z.object({
          accessToken: z.string(),
          name: z.string(),
          email: z.string().email(),
        }),
        ResponseStatus.Success,
      ),
      401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    body: SignInInputSchema,
    summary: 'Sign In',
  },
  signOut: {
    method: 'GET',
    path: '/authentication/sign-out',
    responses: {
      200: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
      401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    // body: SignOutInputSchema,
    headers: z.object({
      authorization: z.string(),
    }),
    summary: 'Sign Out',
  },
  profile: {
    method: 'GET',
    path: 'authentication/profile',
    responses: {
      200: ResponseSchemaGenerator(UserSchema, ResponseStatus.Success),
      401: ResponseSchemaGenerator(z.null(), ResponseStatus.Fail),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    headers: z.object({
      authorization: z.string(),
    }),
    summary: 'get my profile',
  },
});
