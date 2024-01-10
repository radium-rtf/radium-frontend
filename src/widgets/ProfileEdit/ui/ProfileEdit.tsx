'use client';
import { updatePassword, updateUser } from '@/entities/User';
import { useSession } from 'next-auth/react';
import { ProfilePhotoEdit } from '@/features/ProfilePhotoEdit';
import { Card, CardContent, CardFooter, CardHeader, Input } from '@/shared';
import { FC, useState } from 'react';
import { FormSubmitButton } from '@/features/FormSubmitButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { newPasswordValidation } from '../lib/newPasswordValidation';
import { nicknameValidation } from '../lib/nicknameValidation';
import { uploadFile } from '@/shared/api/uploadFile';
import { PasswordInput } from '@/features/PasswordInput';

interface IProps {
  name: string;
}

interface Inputs {
  avatar: FileList;
  name: string;
  currentPassword: string;
  newPassword: string;
}

export const ProfileEdit: FC<IProps> = ({ name }) => {
  const { data, update } = useSession();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({
    avatar,
    currentPassword,
    name,
    newPassword,
  }) => {
    setIsSuccessful(false);
    setIsLoading(true);

    let avatarUrl: string | null = null;
    if (avatar.item(0)) {
      const fd = new FormData();
      fd.append('file', avatar.item(0)!);
      const response = await uploadFile(fd);
      if (typeof response !== 'string') {
        avatarUrl = response.location;
      } else {
        setError('avatar', {
          type: 'custom',
          message: 'Картинка\u00a0не\u00a0загружена',
        });
        setIsLoading(false);
      }
    }

    if (avatarUrl || name !== data?.user?.name) {
      const response = await updateUser({
        avatar: avatarUrl || data?.user?.image || '',
        name: name,
      });

      if (response === 'OK') {
        await update({
          picture: avatarUrl || data?.user?.image || '',
          name: name,
        });
        setIsSuccessful(true);
      } else {
        setError('name', {
          type: 'custom',
          message: 'Ошибка\u00a0загрузки\u00a0данных',
        });
        setIsLoading(false);
        return;
      }
    }

    if (newPassword !== '') {
      const response = await updatePassword({
        current: currentPassword,
        new: newPassword,
      });
      if (response !== 'OK') {
        setError('currentPassword', {
          type: 'custom',
          message: 'Неверный\u00a0пароль',
        });
        setIsLoading(false);
        return;
      } else {
        setIsSuccessful(true);
      }
    }
    await update();
    setIsLoading(false);
  };

  return (
    <Card className='relative w-[19rem]'>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='on'>
        <CardHeader className='pt-[4.5rem]'>
          <ProfilePhotoEdit
            className='absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2'
            initialPhotoURL={data?.user?.image || ''}
            {...register('avatar')}
          />
        </CardHeader>
        <CardContent>
          <Input
            type='text'
            autoComplete='nickname'
            icon='profile'
            placeholder='Имя'
            defaultValue={name}
            {...register('name', {
              validate: nicknameValidation,
            })}
          />
        </CardContent>
        <CardContent>
          <PasswordInput
            iconType='password'
            placeholder='Текущий пароль'
            autoComplete='password'
            {...register('currentPassword')}
          />
        </CardContent>
        <CardContent>
          <PasswordInput
            iconType='password'
            placeholder='Новый пароль'
            autoComplete='new-password'
            {...register('newPassword', {
              validate: newPasswordValidation,
            })}
          />
        </CardContent>
        <CardFooter>
          <FormSubmitButton
            defaultIcon='success'
            isLoading={isLoading}
            text={isSuccessful ? 'Успех!' : 'Подтвердить'}
            error={
              errors.avatar?.message ||
              errors.name?.message ||
              errors.currentPassword?.message ||
              errors.newPassword?.message
            }
          />
        </CardFooter>
      </form>
    </Card>
  );
};
