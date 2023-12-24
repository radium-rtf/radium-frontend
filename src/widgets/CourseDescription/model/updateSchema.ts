import { z } from 'zod';

export const updateSchema = z.object({
  description: z.string().min(1, 'Введите описание курса!'),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
