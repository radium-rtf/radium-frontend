import { z } from 'zod';

export const registrationSchema = z.object({
  email: z
    .string()
    .min(1, 'Необходимо заполнить почту')
    .transform((email) => (email.includes('@') ? email : `${email}@urfu.me`))
    .pipe(z.string().regex(/[a-zA-Z.]@urfu.(me|ru)/, 'Неверная почта')),
  name: z.string().min(1, 'Введите имя'),
  password: z
    .object({
      password: z
        .string()
        .min(1, 'Введите пароль')
        .regex(/[A-Z]/, 'Нет заглавной буквы')
        .regex(/[a-z]/, 'Нет строчной буквы')
        .regex(/[0-9]/, 'Нет цифры')
        .regex(/[^A-Za-z0-9]/, 'Нет спецсимвола'),
      passwordRepeat: z.string(),
    })
    .refine((values) => values.password === values.passwordRepeat, {
      message: 'Пароли не совпадают',
      path: ['passwordRepeat'],
    }),
});

export type registrationSchemaType = z.infer<typeof registrationSchema>;
