import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  answer: z.object({
    question: z.string().min(1, 'Введите вопрос').max(4096, 'Слишком длинный вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
