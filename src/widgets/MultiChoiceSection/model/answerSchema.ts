import { z } from 'zod';

export const answerSchema = z.object({
  multiChoice: z.object({
    answer: z.string().array().min(1, 'Выберите ответ!'),
  }),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
