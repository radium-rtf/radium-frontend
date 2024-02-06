'use client';
import React, { useState } from 'react';
import { Button, Card, CardContent, CardFooter, CardHeader, Icon, Input } from '@/shared';
import Link from 'next/link';
import { Register } from '@/entities/Auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registrationSchema, registrationSchemaType } from '../model/registrationSchema';

export const RegistrationCard = () => {
  const router = useRouter();
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [isSecondPasswordShowed, setIsSecondPasswordShowed] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    watch,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted, errors },
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

  const onSubmitHandler: SubmitHandler<registrationSchemaType> = async (data) => {
    const response = await Register({
      email: data.email.toLowerCase(),
      name: data.name,
      password: data.password.password,
    });
    if (!response) {
      setError('email', { message: 'Ошибка' }, { shouldFocus: false });
      return;
    }
    router.push(`/registration/verify?email=${response.email}`);
  };

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={28} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='font-NTSomic text-xl font-bold text-primary'>Радиум</h1>
      </div>
      <Card className='w-full'>
        <form onSubmit={handleSubmit(onSubmitHandler)} className=''>
          <CardHeader>
            <Input
              icon='mail'
              text={watch('email').includes('@') ? undefined : '@urfu.ru'}
              id='email'
              placeholder='Почта'
              autoComplete='email'
              {...register('email', { onChange: () => clearErrors('root') })}
            />
          </CardHeader>
          <CardContent>
            <Input
              type='text'
              icon='profile'
              placeholder='Имя'
              autoComplete='nickname'
              {...register('name')}
            />
          </CardContent>
          <CardContent>
            <Input
              icon='password'
              actionIcon={isPasswordShowed ? 'visible' : 'invisible'}
              onActionClick={() => setIsPasswordShowed((prev) => !prev)}
              type={isPasswordShowed ? 'text' : 'password'}
              id='password'
              placeholder='Пароль'
              autoComplete='new-password'
              {...register('password.password', { onChange: () => clearErrors('root') })}
            />
          </CardContent>
          <CardContent>
            <Input
              icon='password'
              actionIcon={isSecondPasswordShowed ? 'visible' : 'invisible'}
              onActionClick={() => setIsSecondPasswordShowed((prev) => !prev)}
              type={isPasswordShowed ? 'text' : 'password'}
              id='passwordNew'
              placeholder='Еще раз пароль'
              autoComplete='new-password'
              {...register('password.passwordRepeat', { onChange: () => clearErrors('root') })}
            />
          </CardContent>
          <CardContent>
            <Button
              type='submit'
              className='w-64 justify-start'
              variant={
                isSubmitted && (errors.email || errors.name || errors.password || errors.password)
                  ? 'destructive'
                  : 'default'
              }
              disabled={isSubmitting}
            >
              <Icon
                // eslint-disable-next-line no-constant-condition
                type={false ? 'loading' : false ? 'alert' : 'enter'}
                className='shrink-0 text-inherit'
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2 whitespace-nowrap'>
                {(isSubmitSuccessful && 'Успех!') ||
                  errors.email?.message ||
                  errors.name?.message ||
                  errors.password?.password?.message ||
                  errors.password?.passwordRepeat?.message ||
                  'Зарегистрироваться'}
              </span>
            </Button>
          </CardContent>
          <CardFooter>
            <Button variant='outline' asChild className='w-64 justify-start'>
              <Link href='/login'>
                <Icon type='profile' className='shrink-0 text-inherit' />
                <span className='ml-[calc(50%-18px)] -translate-x-1/2 whitespace-nowrap'>
                  Войти
                </span>
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
