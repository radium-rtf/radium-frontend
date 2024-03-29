import { z } from 'zod';

export const answerSchema = z.object({
  shortanswer: z.object({
    answer: z.string().min(1, 'Введите ответ!'),
  }),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
