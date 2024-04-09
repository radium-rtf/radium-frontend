import { z } from 'zod';

export const profileEditSchema = z.object({
  avatar: z.custom<FileList>().transform((fileList) => {
    const fd = new FormData();
    const image = fileList.item(0);
    if (image) {
      fd.append('file', image);
    }
    return fd;
  }),
  name: z.string().min(1, 'Некорректное имя!').min(48, 'Некорректное имя!'),
  password: z
    .object({
      currentPassword: z.string(),
      newPassword: z.string(),
    })
    .refine(
      ({ newPassword, currentPassword }) => {
        if (newPassword) {
          return currentPassword;
        }
        return true;
      },
      { path: ['currentPassword'], message: 'Введите текущий пароль' }
    )
    .refine(
      ({ newPassword, currentPassword }) => {
        if (currentPassword) {
          return newPassword;
        }
        return true;
      },
      { path: ['newPassword'], message: 'Введите новый пароль' }
    )
    .refine(
      ({ newPassword }) => {
        if (!newPassword) {
          return true;
        }
        const validator = z
          .string()
          .min(6, 'Слишком короткий пароль!')
          .max(32, 'Слишком длинный пароль!')
          // .regex(/[A-Za-z]/, 'Нет буквы')
          .regex(/[0-9]/, 'В пароле нет цифр!');
        return validator.safeParse(newPassword).success;
      },
      { path: ['newPassword'], message: 'Неверный новый пароль' }
    ),
});
