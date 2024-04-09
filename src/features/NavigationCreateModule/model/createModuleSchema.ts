import { z } from 'zod';

export const createModuleSchema = z.object({
  name: z.string().min(1, 'Введите название главы').max(48, 'Слишком длинное название'),
});

export type createModuleSchemaType = z.infer<typeof createModuleSchema>;
