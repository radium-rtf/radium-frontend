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
  choice: z.object({
    answer: z.string({ required_error: 'Необходимо выбрать ответ' }),
    question: z.string().min(1),
    variants: z.object({ value: z.string() }).array().min(3, 'Необходим как минимум 2 ответа'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
