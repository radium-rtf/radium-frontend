import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  mapping: z.object({
    question: z.string().min(1),
    answer: z.object({ value: z.string() }).array(),
    keys: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходим как минимум 2 ответа'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
