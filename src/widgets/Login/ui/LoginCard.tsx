'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, Icon, Input } from '@/shared';
import { loginSchema, loginSchemaType } from '../model/loginSchema';

export const LoginCard = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    watch,
    clearErrors,
    formState: {
      errors,
      isValid,
      isSubmitted,
      isSubmitting,
      isSubmitSuccessful,
    },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const onSubmitHandler: SubmitHandler<loginSchemaType> = async ({
    email,
    password,
  }) => {
    try {
      const result = await signIn('login', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });
      if (!result || !result.ok || result.error) {
        setError(
          'root',
          { message: 'Неверные данные' },
          { shouldFocus: false }
        );
      } else {
        router.push('/');
      }
    } catch {
      setError('root', { message: 'Попробуйте позже' }, { shouldFocus: false });
    }
  };

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={48} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='font-mono text-4xl font-bold text-primary-default'>
          Радиум
        </h1>
      </div>
      <Card className='w-full' asChild>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className={'flex flex-col gap-4'}
        >
          <Input
            iconType='mail'
            placeholder='Почта'
            {...register('email', { onChange: () => clearErrors('root') })}
          >
            {watch('email').includes('@') ? null : (
              <span className='font-sans text-[0.625rem]'>@urfu.me</span>
            )}
          </Input>
          <Input
            iconType='password'
            placeholder='Пароль'
            type={isPasswordShowed ? 'text' : 'password'}
            {...register('password', { onChange: () => clearErrors('root') })}
          >
            <button
              onClick={() => setIsPasswordShowed((prev) => !prev)}
              type='button'
              className='leading-[0]'
            >
              <Icon type={isPasswordShowed ? 'visible' : 'invisible'} />
            </button>
          </Input>
          <Button
            disabled={isSubmitting}
            type='submit'
            color={!isValid && isSubmitted ? 'destructive' : 'accent'}
            className='gap-4'
          >
            <Icon
              type={
                isSubmitting
                  ? 'loading'
                  : !isValid && isSubmitted
                  ? 'alert'
                  : 'enter'
              }
              className='shrink-0 text-inherit'
            />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2 whitespace-nowrap'>
              {(isSubmitSuccessful && 'Успех!') ||
                (errors.root && errors.root.message) ||
                (errors.email && errors.email.message) ||
                (errors.password && errors.password.message) ||
                'Войти'}
            </span>
          </Button>
          <Button asChild className='justify-between gap-4'>
            <Link href='/registration'>
              <Icon type='profile' className='shrink-0 text-inherit' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Зарегистрироваться
              </span>
            </Link>
          </Button>
        </form>
      </Card>
    </section>
  );
};
