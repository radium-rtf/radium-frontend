import { z } from 'zod';

export const updateSchema = z.object({
  media: z.object({
    url: z.string(),
    file: z.instanceof(File).nullable(),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
