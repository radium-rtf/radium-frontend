import { z } from 'zod';

export const answerSchema = z.object({
  lang: z.string().optional(),
  answer: z.string().optional(),
  file: z.instanceof(File).optional(),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
