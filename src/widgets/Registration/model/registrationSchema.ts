import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, 'Некорректная почта!')
    .transform((email) => (email.includes('@') ? email : `${email}@urfu.me`))
    .pipe(z.string().email('Некорректная почта!')),
  name: z.string().min(1, 'Некорректное имя!'),
  password: z
    .object({
      password: z
        .string()
        .min(8, 'Слишком короткий пароль!')
        .regex(/[A-Z]/, 'Нет заглавной буквы')
        .regex(/[a-z]/, 'Нет строчной буквы')
        .regex(/[0-9]/, 'В пароле нет цифр!')
        .regex(/[^A-Za-z0-9]/, 'Нет спецсимвола'),
      passwordRepeat: z.string(),
    })
    .refine((values) => values.password === values.passwordRepeat, {
      message: 'Пароли не совпадают!',
      path: ['passwordRepeat'],
    }),
});

export type registrationSchemaType = z.infer<typeof registrationSchema>;
