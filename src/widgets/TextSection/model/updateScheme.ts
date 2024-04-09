import { SECTION_MAX_CONTENT_LENGTH, SECTION_MIN_CONTENT_LENGTH } from '@/entities/Course';
import { z } from 'zod';

export const updateSchema = z.object({
  text: z.object({
    content: z
      .string()
      .min(SECTION_MIN_CONTENT_LENGTH, 'Введите текст!')
      .max(SECTION_MAX_CONTENT_LENGTH, 'Слишком длинный текст'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
