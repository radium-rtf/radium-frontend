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
      .min(3, 'Необходимо создать как минимум 2 варианта ответа')
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
      ),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
