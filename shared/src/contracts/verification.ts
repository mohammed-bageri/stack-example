import { z } from 'zod';
import { ResponseSchemaGenerator, ResponseStatus, c } from '../helpers';
import {
  ForgetPasswordInputSchema,
  ResetPasswordInputSchema,
  VerifyEmailInputSchema,
} from '../types';

export const verificationContract = c.router({
  verifyEmail: {
    method: 'POST',
    path: '/verification/verify-email',
    responses: {
      200: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    body: VerifyEmailInputSchema,
    summary: 'Verify Email',
  },
  forgotPassword: {
    method: 'POST',
    path: '/verification/forgot-password',
    responses: {
      200: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    body: ForgetPasswordInputSchema,
    summary: 'Forget Password',
  },
  resetPassword: {
    method: 'POST',
    path: '/verification/verify-email',
    responses: {
      200: ResponseSchemaGenerator(z.null(), ResponseStatus.Success),
      500: ResponseSchemaGenerator(z.null(), ResponseStatus.Error),
    },
    body: ResetPasswordInputSchema,
    summary: 'Reset Password',
  },
});
