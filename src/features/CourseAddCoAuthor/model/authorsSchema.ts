import { z } from 'zod';

export const authorsSchema = z.object({
  courseId: z.string(),
  email: z.string().email('Неверная почта'),
});

export type authorsSchemaType = z.infer<typeof authorsSchema>;
