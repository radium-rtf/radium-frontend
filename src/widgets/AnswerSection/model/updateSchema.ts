import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  answer: z.object({
    question: z.string().min(1, 'Необходимо ввести вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
