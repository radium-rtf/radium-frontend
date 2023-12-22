import { z } from 'zod';

export const answerSchema = z.object({
  choice: z.object({
    answer: z
      .string({ invalid_type_error: 'Не выбран ответ' })
      .min(1, 'Не выбран ответ'),
  }),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
