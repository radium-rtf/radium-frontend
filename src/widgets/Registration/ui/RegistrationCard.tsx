'use client';
import React, { FormEventHandler, useReducer, useState } from 'react';
import { Button, Card, Icon, Input } from '@/shared';
import Link from 'next/link';
import { Register } from '@/entities/Auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface IFormState {
  name: string;
  email: string;
  password: string;
  'password-check': string;
}

interface IFormStateAction {
  type: 'name' | 'email' | 'password' | 'password-check';
  value: string;
}

const initialFormState: IFormState = {
  name: '',
  email: '',
  password: '',
  'password-check': '',
};
const formStateReducer = (
  state: IFormState,
  action: IFormStateAction
): IFormState => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.value,
      };
    case 'name':
      return {
        ...state,
        name: action.value,
      };
    case 'password':
      return {
        ...state,
        password: action.value,
      };
    case 'password-check':
      return {
        ...state,
        'password-check': action.value,
      };
    default:
      throw Error('Unknown action');
  }
};

interface IFormErrors {
  name: string | null;
  email: string | null;
  password: string | null;
  'password-check': string | null;
}

interface IFormErrorsAction {
  type: 'name' | 'email' | 'password' | 'password-check';
  value: string | null;
}

const initialFormErrors: IFormErrors = {
  name: null,
  email: null,
  password: null,
  'password-check': null,
};
const formErrorsReducer = (
  state: IFormErrors,
  action: IFormErrorsAction
): IFormErrors => {
  switch (action.type) {
    case 'email':
      return {
        ...state,
        email: action.value,
      };
    case 'name':
      return {
        ...state,
        name: action.value,
      };
    case 'password':
      return {
        ...state,
        password: action.value,
      };
    case 'password-check':
      return {
        ...state,
        'password-check': action.value,
      };
    default:
      throw Error('Unknown action');
  }
};

export const RegistrationCard = () => {
  const router = useRouter();
  const [formState, dispatchFormState] = useReducer(
    formStateReducer,
    initialFormState
  );
  const [formErrorsState, dispatchFormError] = useReducer(
    formErrorsReducer,
    initialFormErrors
  );

  const [isPasswordShowed, setIsPasswordShowed] = useState(false);
  const [isSecondPasswordShowed, setIsSecondPasswordShowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    let isError = false;

    if (!formState.email.match(/[a-zA-Z]+@urfu\.(ru|me)/gi)) {
      dispatchFormError({ type: 'email', value: 'Неверная почта' });
    }
    if (formState.password !== formState['password-check']) {
      isError = true;
      dispatchFormError({
        type: 'password-check',
        value: 'Пароли не совпадают',
      });
    }
    if (!formState.password.match(/\w/gi)) {
      isError = true;
      dispatchFormError({
        type: 'password',
        value: 'В пароле нет букв!',
      });
    } else if (!formState.password.match(/\d/gi)) {
      isError = true;
      dispatchFormError({
        type: 'password',
        value: 'В пароле нет цифр!',
      });
    } else if (formState.password.length < 8) {
      isError = true;
      dispatchFormError({
        type: 'password',
        value: 'Слишком короткий пароль!',
      });
    }

    if (isError) return;

    setIsLoading(true);
    const response = await Register({
      email: formState.email.trim(),
      name: formState.name.trim(),
      password: formState.password.trim(),
    });
    if (typeof response === 'string') {
      dispatchFormError({
        type: 'password-check',
        value: 'Неизвестная ошибка',
      });
      setIsLoading(false);
      return;
    }
    signIn('credentials', {
      email: formState.email.trim(),
      password: formState.password.trim(),
      redirect: false,
    })
      .then((e) => {
        if (e?.error) {
          dispatchFormError({
            type: 'password-check',
            value: 'Неизвестная ошибка',
          });
          return;
        }
        router.push('/');
      })
      .finally(() => setIsLoading(false));
  };

  const error =
    formErrorsState.email ||
    formErrorsState.name ||
    formErrorsState.password ||
    formErrorsState['password-check'];

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={28} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='font-mono text-4xl text-primary-default'>Радиум</h1>
      </div>
      <Card className='w-full'>
        <form
          onSubmit={submitHandler}
          className='mx-auto flex w-[256px] flex-col gap-4'
        >
          <Input
            iconType='mail'
            type='text'
            name='email'
            placeholder='Почта'
            autoComplete='email'
            onChange={(e) => {
              formErrorsState.email &&
                dispatchFormError({ type: 'email', value: null });
              dispatchFormState({ type: 'email', value: e.target.value });
            }}
          >
            {formState.email.includes('@') ? null : (
              <span className='font-sans text-[0.625rem]'>urfu.me</span>
            )}
          </Input>
          <Input
            iconType='profile'
            type='text'
            name='name'
            placeholder='Имя'
            autoComplete='nickname'
            onChange={(e) => {
              formErrorsState.name &&
                dispatchFormError({ type: 'name', value: null });
              dispatchFormState({ type: 'name', value: e.target.value });
            }}
          />
          <Input
            iconType='password'
            type={isPasswordShowed ? 'text' : 'password'}
            autoComplete='new-password'
            name='password'
            placeholder='Пароль'
            onChange={(e) => {
              formErrorsState.password &&
                dispatchFormError({ type: 'password', value: null });
              dispatchFormState({ type: 'password', value: e.target.value });
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
          <Input
            iconType='password'
            type={isSecondPasswordShowed ? 'text' : 'password'}
            name='password-check'
            autoComplete='new-password'
            placeholder='Еще раз пароль'
            onChange={(e) => {
              formErrorsState['password-check'] &&
                dispatchFormError({ type: 'password-check', value: null });
              dispatchFormState({
                type: 'password-check',
                value: e.target.value,
              });
            }}
          >
            <button
              onClick={() => setIsSecondPasswordShowed((prev) => !prev)}
              type='button'
              className='leading-[0]'
            >
              <Icon type={isSecondPasswordShowed ? 'invisible' : 'visible'} />
            </button>
          </Input>
          <Button
            type='submit'
            color={isLoading || !error ? 'accent' : 'destructive'}
            disabled={isLoading}
          >
            <Icon
              type={isLoading ? 'loading' : error ? 'alert' : 'enter'}
              className='shrink-0 text-inherit'
            />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2 whitespace-nowrap'>
              {error || 'Зарегистрироваться'}
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
