import { z } from 'zod';

export const CourseDescriptionEditSchema = z.object({
  description: z.string().min(1, 'Введите описание').max(512, 'Слишком длинное описание'),
});
