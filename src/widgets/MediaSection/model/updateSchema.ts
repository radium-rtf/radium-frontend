import { z } from 'zod';

export const updateSchema = z.object({
  media: z.object({
    url: z.string().min(1, 'Введите ссылку!'),
    file: z.instanceof(File).nullable(),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
