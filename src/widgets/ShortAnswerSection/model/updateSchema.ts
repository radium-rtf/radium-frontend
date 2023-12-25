import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z
    .number({ invalid_type_error: 'Введите кол-во попыток!' })
    .nonnegative('Негативные попытки!'),
  maxScore: z
    .number({ invalid_type_error: 'Введите кол-во баллов!' })
    .nonnegative('Негативные баллы!'),
  shortanswer: z.object({
    answer: z
      .string({ invalid_type_error: 'Необходимо ввести ответ' })
      .min(1, 'Необходимо ввести ответ'),
    question: z
      .string({ invalid_type_error: 'Необходимо ввести вопрос' })
      .min(1, 'Необходимо ввести вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
