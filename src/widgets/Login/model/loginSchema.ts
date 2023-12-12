import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Введите почту!')
    .transform((email) => (email.includes('@') ? email : `${email}@urfu.me`))
    .pipe(z.string().regex(/[a-zA-Z.]@urfu.(me|ru)/, 'Некорректная почта!')),
  password: z.string().min(1, 'Введите пароль!'),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
