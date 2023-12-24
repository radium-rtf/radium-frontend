import { z } from 'zod';

export const updateSchema = z.object({
  name: z
    .string()
    .min(1, 'Введите название курса!')
    .max(100, 'Слишком длинное название!'),
  shortDescription: z.string().min(1, 'Введите описание курса!'),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
