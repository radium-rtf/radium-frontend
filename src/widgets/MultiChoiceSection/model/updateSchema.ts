import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number().nonnegative(),
  maxScore: z.number().nonnegative(),
  multichoice: z.object({
    answer: z.string().array().min(1, 'Необходимо выбрать как минимум 1 ответ'),
    question: z.string().min(1),
    variants: z
      .object({ value: z.string() })
      .array()
      .min(3, 'Необходимо создать как минимум 2 варианта ответа'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
