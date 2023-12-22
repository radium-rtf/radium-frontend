import { z } from 'zod';

export const addContactSchema = z.object({
  link: z.string().url('Неввалидная ссылка'),
  name: z.string().min(1, 'Введите название'),
});

export type addContactSchemaType = z.infer<typeof addContactSchema>;
