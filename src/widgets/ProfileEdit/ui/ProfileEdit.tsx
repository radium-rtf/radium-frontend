'use client';
import { updatePassword, updateUser } from '@/entities/User';
import { useSession } from 'next-auth/react';
import { ProfilePhotoEdit } from '@/features/ProfilePhotoEdit';
import { Card, CardContent, CardFooter, CardHeader, Input } from '@/shared';
import { FC } from 'react';
import { FormSubmitButton } from '@/features/FormSubmitButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { uploadFile } from '@/shared/api/uploadFile';
import { PasswordInput } from '@/features/PasswordInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileEditSchema } from '../models/profileEditSchema';
import { z } from 'zod';

interface IProps {
  name: string;
}

export const ProfileEdit: FC<IProps> = ({ name }) => {
  const { data, update } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<z.infer<typeof profileEditSchema>>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: name,
      password: {
        currentPassword: '',
        newPassword: '',
      },
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof profileEditSchema>> = async (values) => {
    let avatarUrl: string | null = null;
    if (values.avatar.has('file')) {
      const response = await uploadFile(values.avatar);
      if (typeof response !== 'string') {
        avatarUrl = response.location;
      } else {
        setError('avatar', {
          type: 'custom',
          message: 'Картинка\u00a0не\u00a0загружена',
        });
      }
    }

    if (avatarUrl || values.name !== data?.user?.name) {
      const response = await updateUser({
        avatar: avatarUrl || data?.user?.image || '',
        name: values.name,
      });

      if (response === 'OK') {
        await update({
          picture: avatarUrl || data?.user?.image || '',
          name: values.name,
        });
        await update();
      } else {
        setError('name', {
          type: 'custom',
          message: 'Ошибка\u00a0загрузки\u00a0данных',
        });
      }
    }

    if (values.password.newPassword !== '') {
      const response = await updatePassword({
        current: values.password.currentPassword,
        new: values.password.newPassword,
      });
      if (response !== 'OK') {
        setError('password.currentPassword', {
          type: 'custom',
          message: 'Неверный\u00a0пароль',
        });
        return;
      }
    }
  };

  return (
    <Card className='relative w-[19rem]'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
        <CardHeader className='flex items-center justify-center pt-[4.5rem]'>
          <ProfilePhotoEdit
            className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2'
            initialPhotoURL={data?.user?.image || ''}
            {...register('avatar')}
          />
        </CardHeader>
        <CardContent>
          <Input type='text' icon='profile' placeholder='Имя' {...register('name')} />
        </CardContent>
        <CardContent>
          <PasswordInput
            iconType='password'
            placeholder='Текущий пароль'
            autoComplete='password'
            {...register('password.currentPassword')}
          />
        </CardContent>
        <CardContent>
          <PasswordInput
            iconType='password'
            placeholder='Новый пароль'
            autoComplete='new-password'
            {...register('password.newPassword')}
          />
        </CardContent>
        <CardFooter>
          <FormSubmitButton
            defaultIcon='success'
            isLoading={isSubmitting}
            text={isSubmitSuccessful ? 'Успех!' : 'Подтвердить'}
            error={
              errors.avatar?.message ||
              errors.name?.message ||
              errors.password?.currentPassword?.message ||
              errors.password?.newPassword?.message
            }
          />
        </CardFooter>
      </form>
    </Card>
  );
};
