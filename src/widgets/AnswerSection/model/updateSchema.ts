import { SECTION_MAX_CONTENT_LENGTH, SECTION_MIN_CONTENT_LENGTH } from '@/entities/Course';
import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  answer: z.object({
    question: z
      .string()
      .min(SECTION_MIN_CONTENT_LENGTH, 'Введите вопрос')
      .max(SECTION_MAX_CONTENT_LENGTH, 'Слишком длинный вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
