import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Введите почту'),
  password: z.string().min(1, 'Введите пароль'),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
