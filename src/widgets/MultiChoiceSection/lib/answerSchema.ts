import { z } from 'zod';

export const answerSchema = z.object({
  multiChoice: z.object({
    answer: z.string().array().min(1, 'Необходимо выбрать хотя бы 1 ответ'),
  }),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
