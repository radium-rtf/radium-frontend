import { z } from 'zod';

export const updateSchema = z.object({
  text: z.object({
    content: z.string().min(1, 'Введите текст!'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
