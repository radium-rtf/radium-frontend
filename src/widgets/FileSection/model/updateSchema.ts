import { FileType } from '@/shared';
import { z } from 'zod';

function refineTypes(elements: string[]): boolean {
  return elements.every((el: string) => el.trim().slice(1) in FileType);
}

export const updateSchema = z.object({
  maxAttempts: z.number(),
  maxScore: z.number(),
  file: z.object({
    question: z
      .string({ invalid_type_error: 'Необходимо ввести задание' })
      .min(1, 'Необходимо ввести задание'),
    fileTypes: z
      .string()
      .transform((value) => value.split(',').map((value) => value.trim()))
      .refine((value) => refineTypes(value), {
        message: 'Некорректные расширения',
      }),
  }),
});

export type updateSchemaType = z.infer<typeof updateSchema>;
