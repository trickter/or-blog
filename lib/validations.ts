import { z } from 'zod';
export const postSchema = z.object({ title: z.string().min(3), slug: z.string().min(3), excerpt: z.string().max(280).optional(), content: z.string().min(10), status: z.enum(['DRAFT', 'PUBLISHED']), tagIds: z.array(z.string()).default([]) });
export const tagSchema = z.object({ name: z.string().min(2), slug: z.string().min(2) });
