import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  mapping: z.object({
    question: z.string().min(1),
    answer: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходим как минимум 2 ответа')
      .refine((answers) => {
        for (let i = 0; i < answers.length - 1; i++) {
          if (answers[i].value === '') {
            return false;
          }
        }
        return true;
      }, 'Пустой ответ!'),

    keys: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходим как минимум 2 варинта')
      .refine((answers) => {
        for (let i = 0; i < answers.length - 1; i++) {
          if (answers[i].value === '') {
            return false;
          }
        }
        return true;
      }, 'Пустой вариант!'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
