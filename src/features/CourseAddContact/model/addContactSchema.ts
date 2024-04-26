import { z } from 'zod';

export const addContactSchema = z.object({
  link: z
    .string()
    .min(1, 'Введите ссылку')
    .max(1024, 'Слишком длинная ссылка')
    .url('Неввалидная ссылка'),
  name: z.string().min(1, 'Введите название').max(64, 'Слишком длинное название'),
});

export type addContactSchemaType = z.infer<typeof addContactSchema>;
