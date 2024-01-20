import { c } from '../helpers';
import { authenticationContract } from './authentication';
import { categoryContract } from './category';
import { postContract } from './post';
import { commentContract } from './comment';
import { verificationContract } from './verification';
import { userContract } from './user';

export const contract = c.router({
  authentication: authenticationContract,
  verification: verificationContract,
  users: userContract,
  categories: categoryContract,
  posts: postContract,
  comments: commentContract,
});
