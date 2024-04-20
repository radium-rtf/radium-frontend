import { z } from 'zod';

export const answerSchema = z.object({
  comment: z.string(),
  score: z.number({ coerce: true }).min(0, 'Необходимо ввести балл'),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
