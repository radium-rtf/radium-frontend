'use client';
import React, { useState } from 'react';
import { Button, Card, Icon, Input } from '@/shared';
import Link from 'next/link';
import { Register } from '@/entities/Auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registrationSchema,
  registrationSchemaType,
} from '../model/registrationSchema';

export const RegistrationCard = () => {
  const router = useRouter();
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [isSecondPasswordShowed, setIsSecondPasswordShowed] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: {
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      errors,
    },
  } = useForm<registrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      name: '',
      password: {
        password: '',
        passwordRepeat: '',
      },
    },
  });

  const onSubmitHandler: SubmitHandler<registrationSchemaType> = async (
    data
  ) => {
    const response = await Register({
      email: data.email.toLowerCase(),
      name: data.name,
      password: data.password.password,
    });
    if (typeof response === 'string') {
      setError('email', { message: 'Ошибка' }, { shouldFocus: false });
      return;
    }
    router.push(`/registration/verify?email=${response.email}`);
  };

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={28} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='font-mono text-4xl font-bold text-primary-default'>
          Радиум
        </h1>
      </div>
      <Card className='w-full'>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className='mx-auto flex w-[256px] flex-col gap-4'
        >
          <Input
            iconType='mail'
            type='text'
            placeholder='Почта'
            autoComplete='email'
            {...register('email')}
          >
            {watch('email').includes('@') ? null : (
              <span className='font-sans text-[0.625rem]'>@urfu.me</span>
            )}
          </Input>
          <Input
            iconType='profile'
            type='text'
            placeholder='Имя'
            autoComplete='nickname'
            {...register('name')}
          />
          <Input
            iconType='password'
            type={isPasswordShowed ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='Пароль'
            {...register('password.password')}
          >
            <button
              onClick={() => setIsPasswordShowed((prev) => !prev)}
              type='button'
              className='leading-[0]'
            >
              <Icon type={isPasswordShowed ? 'visible' : 'invisible'} />
            </button>
          </Input>
          <Input
            iconType='password'
            type={isSecondPasswordShowed ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='Еще раз пароль'
            {...register('password.passwordRepeat')}
          >
            <button
              onClick={() => setIsSecondPasswordShowed((prev) => !prev)}
              type='button'
              className='leading-[0]'
            >
              <Icon type={isSecondPasswordShowed ? 'visible' : 'invisible'} />
            </button>
          </Input>
          <Button
            type='submit'
            color={!isValid && isSubmitted ? 'destructive' : 'accent'}
            disabled={isSubmitting}
          >
            <Icon
              type={false ? 'loading' : false ? 'alert' : 'enter'}
              className='shrink-0 text-inherit'
            />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2 whitespace-nowrap'>
              {(isSubmitSuccessful && 'Успех!') ||
                errors.email?.message ||
                errors.name?.message ||
                errors.password?.password?.message ||
                errors.password?.passwordRepeat?.message ||
                'Зарегистрироваться'}
            </span>
          </Button>
          <Button asChild className='gap-4'>
            <Link href='/login'>
              <Icon type='profile' className='shrink-0 text-inherit' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2 whitespace-nowrap'>
                Войти
              </span>
            </Link>
          </Button>
        </form>
      </Card>
    </section>
  );
};
