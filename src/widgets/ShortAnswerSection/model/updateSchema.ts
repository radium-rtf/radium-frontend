import {
  SECTION_MAX_CONTENT_LENGTH,
  SECTION_MAX_VARIANT_LENGTH,
  SECTION_MIN_CONTENT_LENGTH,
  SECTION_MIN_VARIANT_LENGTH,
} from '@/entities/Course';
import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z
    .number({ invalid_type_error: 'Введите кол-во попыток!' })
    .nonnegative('Негативные попытки!')
    .int('Нецелые попытки!'),
  maxScore: z
    .number({ invalid_type_error: 'Введите кол-во баллов!' })
    .nonnegative('Негативные баллы!')
    .int('Нецелые баллы!'),
  shortanswer: z.object({
    answer: z
      .string({ invalid_type_error: 'Необходимо ввести ответ' })
      .min(SECTION_MIN_VARIANT_LENGTH, 'Необходимо ввести ответ')
      .max(SECTION_MAX_VARIANT_LENGTH, 'Слишком длинный ответ'),
    question: z
      .string({ invalid_type_error: 'Необходимо ввести вопрос' })
      .min(SECTION_MIN_CONTENT_LENGTH, 'Введите вопрос')
      .max(SECTION_MAX_CONTENT_LENGTH, 'Слишком длинный вопрос'),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
