import {
  CategoryCreateInputSchema,
  CategoryUpdateInputSchema,
  CommentCreateInputSchema,
  CommentUpdateInputSchema,
  PostCreateInputSchema,
  PostUpdateInputSchema,
  UserCreateInputSchema,
  UserUpdateInputSchema,
} from './zod';
import { z } from 'zod';

export const SignUpInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const SignInInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignOutInputSchema = z.null();

export const VerifyEmailInputSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export const ForgetPasswordInputSchema = z.object({
  email: z.string().email(),
});

export const ResetPasswordInputSchema = z.object({
  password: z.string(),
  email: z.string().email(),
  token: z.string(),
});

export type SignUpInput = z.infer<typeof SignUpInputSchema>;
export type SignInInput = z.infer<typeof SignInInputSchema>;
export type SignOutInput = z.infer<typeof SignOutInputSchema>;

export type VerifyEmailInput = z.infer<typeof VerifyEmailInputSchema>;
export type ForgetPasswordInput = z.infer<typeof ForgetPasswordInputSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;

export type PostCreateInput = z.infer<typeof PostCreateInputSchema>;
export type PostUpdateInput = z.infer<typeof PostUpdateInputSchema>;

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
export type UserUpdateInput = z.infer<typeof UserUpdateInputSchema>;

export type CategoryCreateInput = z.infer<typeof CategoryCreateInputSchema>;
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateInputSchema>;

export type CommentCreateInput = z.infer<typeof CommentCreateInputSchema>;
export type CommentUpdateInput = z.infer<typeof CommentUpdateInputSchema>;

export * from './zod';
