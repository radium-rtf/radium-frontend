import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, 'Некорректная почта!')
    .transform((email) => (email.includes('@') ? email : `${email}@urfu.me`))
    .pipe(z.string().email('Некорректная почта!')),
  name: z.string().min(1, 'Некорректное имя!').max(48, 'Некорректное имя!'),
  password: z
    .object({
      password: z
        .string()
        .min(6, 'Слишком короткий пароль!')
        .max(32, 'Слишком длинный пароль!')
        // .regex(/([A-Za-z]|[#?!@$%^&*\-.])+/i, 'Нет буквы')
        .regex(/[0-9]/, 'В пароле нет цифр!'),
      passwordRepeat: z.string(),
    })
    .refine((values) => values.password === values.passwordRepeat, {
      message: 'Пароли не совпадают!',
      path: ['passwordRepeat'],
    }),
});

export type registrationSchemaType = z.infer<typeof registrationSchema>;
