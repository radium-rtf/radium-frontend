import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  permutation: z.object({
    question: z.string().min(1, 'Необходимо ввести вопрос'),
    answer: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходимо как минимум 2 варианта ответа'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
