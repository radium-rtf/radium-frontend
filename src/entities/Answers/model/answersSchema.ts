import { z } from 'zod';

export const answerSchema = z.object({
  comment: z.string(),
  score: z.preprocess(
    (a) => parseInt(z.string().parse(a)),
    z.number().min(0, 'Необходимо ввести балл')
  ),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
