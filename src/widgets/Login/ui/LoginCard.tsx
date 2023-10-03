'use client';
import React, { FormEventHandler, useReducer, useState } from 'react';
import { Button, Card, Icon, Input } from '@/shared';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface IState {
  email: string;
  password: string;
}

interface IAction {
  type: 'email' | 'password';
  value: string;
}

const initialState: IState = {
  email: '',
  password: '',
};

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.value,
      };
    case 'password':
      return {
        ...state,
        password: action.value,
      };
    default:
      throw Error('Unknown action');
  }
};

export const LoginCard = () => {
  const router = useRouter();
  const [formData, dispatchFormData] = useReducer(reducer, initialState);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    console.log(email, password);

    setIsLoading(() => true);
    signIn('credentials', { email, password, redirect: false })
      .then((e) => {
        if (e?.error) {
          setError(e.error);
          return;
        }
        router.push('/');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={28} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='font-mono text-4xl text-primary-default'>Радиум</h1>
      </div>
      <Card className='w-full'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <Input
            iconType='mail'
            placeholder='Почта'
            type='email'
            name='email'
            onChange={(e) => {
              error && setError(null);
              dispatchFormData({ type: 'email', value: e.target.value });
            }}
          >
            {formData.email.includes('@') ? null : (
              <span className='font-sans text-[0.625rem]'>urfu.me</span>
            )}
          </Input>
          <Input
            iconType='password'
            placeholder='Пароль'
            type={isPasswordShowed ? 'text' : 'password'}
            name='password'
            onChange={(e) => {
              error && setError(null);
              dispatchFormData({ type: 'password', value: e.target.value });
            }}
          >
            <button
              onClick={() => setIsPasswordShowed((prev) => !prev)}
              type='button'
              className='leading-[0]'
            >
              <Icon type={isPasswordShowed ? 'invisible' : 'visible'} />
            </button>
          </Input>
          <Button
            disabled={isLoading}
            type='submit'
            color={isLoading || !error ? 'accent' : 'destructive'}
            className='gap-4'
          >
            <Icon
              type={isLoading ? 'loading' : error ? 'alert' : 'enter'}
              className='shrink-0 text-inherit'
            />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2 whitespace-nowrap'>
              {isLoading ? 'Входим...' : error ? 'Неверные данные!' : 'Войти'}
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
