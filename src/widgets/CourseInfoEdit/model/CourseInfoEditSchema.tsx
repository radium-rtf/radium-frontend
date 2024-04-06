import { z } from 'zod';

export const CourseInfoEditSchema = z.object({
  name: z.string().min(1, 'Введите название').max(64, 'Слишком длинное название'),
  shortDescription: z.string().min(1, 'Введите описание').max(512, 'Слишком длинное описание'),
  slug: z
    .string()
    .min(1, 'Введите адрес ссылки')
    .max(64, 'Слишком длинный адрес ссылки')
    .regex(/^[a-zA-z\d-_]*$/, 'Некорректный адрес'),
  isPublished: z.union([z.literal('on'), z.literal('off')]),
});
