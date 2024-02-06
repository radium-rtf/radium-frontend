'use client';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, CardContent, CardFooter, CardHeader, Icon, Input } from '@/shared';
import { loginSchema, loginSchemaType } from '../model/loginSchema';

export const LoginCard = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    watch,
    clearErrors,
    formState: { errors, isValid, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const onSubmitHandler: SubmitHandler<loginSchemaType> = async ({ email, password }) => {
    try {
      const result = await signIn('login', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      });
      if (!result || !result.ok || result.error) {
        setError('root', { message: 'Неверные данные' }, { shouldFocus: false });
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
        <h1 className='font-NTSomic text-xl font-bold text-primary'>Радиум</h1>
      </div>
      <Card className='w-full'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
              icon='password'
              actionIcon={isPasswordShowed ? 'visible' : 'invisible'}
              onActionClick={() => setIsPasswordShowed((prev) => !prev)}
              type={isPasswordShowed ? 'text' : 'password'}
              id='password'
              placeholder='Пароль'
              autoComplete='password'
              {...register('password', { onChange: () => clearErrors('root') })}
            />
          </CardContent>
          <CardContent>
            <Button
              disabled={isSubmitting}
              type='submit'
              variant={
                isSubmitted && (errors.root || errors.email || errors.password)
                  ? 'destructive'
                  : 'default'
              }
              className='w-64 justify-start gap-4'
            >
              <Icon
                type={isSubmitting ? 'loading' : !isValid && isSubmitted ? 'alert' : 'enter'}
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
          </CardContent>
          <CardFooter>
            <Button variant='outline' asChild className='w-64 justify-between gap-4'>
              <Link href='/registration'>
                <Icon type='profile' className='shrink-0 text-inherit' />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Зарегистрироваться</span>
              </Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
