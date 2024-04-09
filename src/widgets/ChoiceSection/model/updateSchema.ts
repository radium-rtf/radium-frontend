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
    question: z.string().min(1, 'Введите вопрос').max(4096, 'Слишком длинный вопрос'),
    variants: z
      .object({
        value: z.string(),
      })
      .array()
      .transform((arr) => {
        if (arr[arr.length - 1].value) {
          return arr;
        }
        return arr.slice(0, -1);
      })
      .pipe(
        z
          .object({
            value: z
              .string()
              .min(3, 'Слишком короткий вариант')
              .max(256, 'Слишком длинный вариант'),
          })
          .array()
          .min(2, 'Минимум 2 варианта')
          .max(10, 'Максимум 10 вариантов')
      ),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
