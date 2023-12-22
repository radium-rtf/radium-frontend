import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number().nonnegative('Негативные попытки!').int(),
  maxScore: z.number().nonnegative('Негативные баллы!').int(),
  choice: z.object({
    answer: z.string().min(1, 'Необходимо выбрать ответ'),
    question: z.string().min(1),
    variants: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходим как минимум 2 ответа'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
