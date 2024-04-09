import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z
    .number({ invalid_type_error: 'Введите кол-во попыток!' })
    .nonnegative('Негативные попытки!')
    .int('Нецелые попытки!'),
  maxScore: z
    .number({ invalid_type_error: 'Введите кол-во баллов!' })
    .nonnegative('Негативные баллы!')
    .int('Нецелые баллы!'),
  shortanswer: z.object({
    answer: z
      .string({ invalid_type_error: 'Необходимо ввести ответ' })
      .min(1, 'Необходимо ввести ответ')
      .max(256, 'Слишком длинный ответ'),
    question: z
      .string({ invalid_type_error: 'Необходимо ввести вопрос' })
      .min(1, 'Введите вопрос')
      .max(4096, 'Слишком длинный вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
