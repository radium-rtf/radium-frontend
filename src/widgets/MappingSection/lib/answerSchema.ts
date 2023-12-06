import { z } from 'zod';

export const answerSchema = z.object({
  mapping: z.object({
    answer: z
      .object({
        value: z.string(),
      })
      .array(),
  }),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
