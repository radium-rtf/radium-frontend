import { z } from 'zod';

export const createPageSchema = z.object({
  name: z.string().min(1, 'Введите название страницы').max(48, 'Слишком длинное название'),
});

export type createPageSchemaType = z.infer<typeof createPageSchema>;
