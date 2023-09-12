'use client';
import React, { FormEventHandler, useReducer, useRef, useState } from 'react';
import { Button, Input } from '@/shared';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email = formData.email;
    const password = formData.password;

    signIn('credentials', { email, password, redirect: false }).then((e) => {
      if (e?.error) {
        setError(e.error);
      }
      router.push('/');
    });
  };

  return (
    <section className='w-[16rem]'>
      <h1 className='mb-9 ml-4 text-5xl font-bold text-accent-primary-200'>
        Вход
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Input
          placeholder='Почта'
          type='email'
          name='email'
          onChange={(e) => {
            error && setError(null);
            dispatchFormData({ type: 'email', value: e.target.value });
          }}
        >
          @urfu.me
        </Input>
        <Input
          placeholder='Пароль'
          type='password'
          name='password'
          onChange={(e) => {
            error && setError(null);
            dispatchFormData({ type: 'password', value: e.target.value });
          }}
        ></Input>
        {error && (
          <span className='text-[0.625rem] text-accent-destructive-200'>
            {error === 'CredentialsSignin'
              ? 'Неправильная почта или пароль'
              : 'Неизвестная ошибка'}
          </span>
        )}
        <Button type='submit' color='accent'>
          Войти
        </Button>
        <Link
          className='ml-4 flex-grow-0 text-accent-primary-200 underline'
          href='/registration'
        >
          Зарегистрироваться
        </Link>
      </form>
    </section>
  );
};
