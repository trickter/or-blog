import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: Array<string | undefined | false>) { return twMerge(clsx(inputs)); }
export function slugify(text: string) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}
