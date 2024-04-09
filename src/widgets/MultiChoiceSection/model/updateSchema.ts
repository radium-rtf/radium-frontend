import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number().nonnegative(),
  maxScore: z.number().nonnegative(),
  multichoice: z.object({
    answer: z.string().array().min(1, 'Минимум 1 ответ'),
    question: z.string().min(1, 'Введите вопрос').max(4096, 'Слишком длинный вопрос'),
    variants: z
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
          .refine(
            (nums) => {
              return Object.values(
                nums.reduce(
                  (prev, curr) => {
                    if (!prev[curr.value]) {
                      prev[curr.value] = 0;
                    }
                    prev[curr.value] += 1;
                    return prev;
                  },
                  {} as { [key: string]: number }
                )
              ).every((num) => num === 1);
            },
            { message: 'Дубликат!' }
          )
      ),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
