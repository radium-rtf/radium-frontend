import { z } from 'zod';

export const answerSchema = z.object({
  file: z.instanceof(File).nullable(),
});

export type answerSchemaType = z.infer<typeof answerSchema>;
