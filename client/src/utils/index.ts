import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { initQueryClient } from '@ts-rest/react-query';
import { contract } from '@app/shared';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const client = initQueryClient(contract, {
  baseUrl: import.meta.env.VITE_API_URL,
  baseHeaders: {},
});
