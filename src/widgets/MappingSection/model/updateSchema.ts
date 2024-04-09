import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  mapping: z.object({
    question: z.string().min(1, 'Введите вопрос').max(4096, 'Слишком длинный вопрос'),
    answer: z
      .object({ value: z.string() })
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
          .refine((answers) => {
            for (let i = 0; i < answers.length - 1; i++) {
              if (answers[i].value === '') {
                return false;
              }
            }
            return true;
          }, 'Пустой ответ!')
      ),
    keys: z
      .object({ value: z.string() })
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
          .refine((answers) => {
            for (let i = 0; i < answers.length - 1; i++) {
              if (answers[i].value === '') {
                return false;
              }
            }
            return true;
          }, 'Пустой ответ!')
      ),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
