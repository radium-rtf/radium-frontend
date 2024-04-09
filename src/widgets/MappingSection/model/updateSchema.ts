import {
  SECTION_MAX_CONTENT_LENGTH,
  SECTION_MAX_VARIANT_COUNT,
  SECTION_MAX_VARIANT_LENGTH,
  SECTION_MIN_CONTENT_LENGTH,
  SECTION_MIN_VARIANT_COUNT,
  SECTION_MIN_VARIANT_LENGTH,
} from '@/entities/Course';
import { z } from 'zod';

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  mapping: z.object({
    question: z
      .string()
      .min(SECTION_MIN_CONTENT_LENGTH, 'Введите вопрос')
      .max(SECTION_MAX_CONTENT_LENGTH, 'Слишком длинный вопрос'),
    answer: z
      .object({
        value: z.string(),
      })
      .array()
      .transform((arr) => {
        if (arr[arr.length - 1].value) {
          return arr;
        }
        return arr.slice(0, -1);
      })
      .pipe(
        z
          .object({
            value: z
              .string()
              .min(SECTION_MIN_VARIANT_LENGTH, 'Слишком короткий вариант')
              .max(SECTION_MAX_VARIANT_LENGTH, 'Слишком длинный вариант'),
          })
          .array()
          .min(SECTION_MIN_VARIANT_COUNT, `Минимум ${SECTION_MIN_VARIANT_COUNT} варианта`)
          .max(SECTION_MAX_VARIANT_COUNT, `Максимум ${SECTION_MAX_VARIANT_COUNT} вариантов`)
          .refine((answers) => {
            for (let i = 0; i < answers.length - 1; i++) {
              if (answers[i].value === '') {
                return false;
              }
            }
            return true;
          }, 'Пустой ответ!')
      ),
    keys: z
      .object({
        value: z.string(),
      })
      .array()
      .transform((arr) => {
        if (arr[arr.length - 1].value) {
          return arr;
        }
        return arr.slice(0, -1);
      })
      .pipe(
        z
          .object({
            value: z
              .string()
              .min(SECTION_MIN_VARIANT_LENGTH, 'Слишком короткий вариант')
              .max(SECTION_MAX_VARIANT_LENGTH, 'Слишком длинный вариант'),
          })
          .array()
          .min(SECTION_MIN_VARIANT_COUNT, `Минимум ${SECTION_MIN_VARIANT_COUNT} варианта`)
          .max(SECTION_MAX_VARIANT_COUNT, `Максимум ${SECTION_MAX_VARIANT_COUNT} вариантов`)
          .refine((answers) => {
            for (let i = 0; i < answers.length - 1; i++) {
              if (answers[i].value === '') {
                return false;
              }
            }
            return true;
          }, 'Пустой ответ!')
      ),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
