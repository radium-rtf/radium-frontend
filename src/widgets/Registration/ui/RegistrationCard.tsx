'use client';
import React, { FormEventHandler, useReducer } from 'react';
import { Button, Input } from '@/shared';
import Link from 'next/link';
import { Register } from '@/entities/Auth';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
    if (
      !formState.password.match(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/
      )
    ) {
      isError = true;
      dispatchFormError({
        type: 'password',
        value:
          'Слабый пароль! Попробуйте хотя бы 8 знаков, включая заглавные и строчные буквы, цифры и специальные символы',
      });
    }

    if (isError) return;

    const response = await Register({
      email: formState.email.trim(),
      name: formState.name.trim(),
      password: formState.password.trim(),
    });
    if (typeof response === 'string') {
      dispatchFormError({
        type: 'name',
        value: 'Мы не можем принять такое имя, попробуйте другое',
      });
      return;
    }
    signIn('credentials', {
      email: formState.email.trim(),
      password: formState.password.trim(),
      redirect: false,
    }).then((e) => {
      if (e?.error) {
        dispatchFormError({
          type: 'password-check',
          value: 'Неизвестная ошибка',
        });
        return;
      }
      router.push('/');
    });
  };

  return (
    <section>
      <h1 className='mb-9 w-[300px] text-5xl font-bold tracking-wide text-accent-primary-200'>
        Регистрация
      </h1>
      <form
        onSubmit={submitHandler}
        className='mx-auto flex w-[256px] flex-col gap-4'
      >
        <Input
          type='text'
          name='name'
          placeholder='Имя'
          onChange={(e) => {
            formErrorsState.name &&
              dispatchFormError({ type: 'name', value: null });
            dispatchFormState({ type: 'name', value: e.target.value });
          }}
        />
        {formErrorsState.name && (
          <span className='mx-4 w-[220px] text-[0.625rem] text-accent-destructive-200'>
            {formErrorsState.name}
          </span>
        )}
        <Input
          type='text'
          name='email'
          placeholder='Почта'
          onChange={(e) => {
            formErrorsState.email &&
              dispatchFormError({ type: 'email', value: null });
            dispatchFormState({ type: 'email', value: e.target.value });
          }}
        >
          {formState.email.includes('@') ? undefined : '@urfu.me'}
        </Input>
        {formErrorsState.email && (
          <span className='mx-4 text-[0.625rem] text-accent-destructive-200'>
            {formErrorsState.email}
          </span>
        )}
        <Input
          type='password'
          name='password'
          placeholder='Пароль'
          onChange={(e) => {
            formErrorsState.password &&
              dispatchFormError({ type: 'password', value: null });
            dispatchFormState({ type: 'password', value: e.target.value });
          }}
        />
        {formErrorsState.password && (
          <span className='mx-4 w-[220px] text-[0.625rem] text-accent-destructive-200'>
            {formErrorsState.password}
          </span>
        )}
        <Input
          type='password'
          name='password-check'
          placeholder='Еще пароль'
          onChange={(e) => {
            formErrorsState['password-check'] &&
              dispatchFormError({ type: 'password-check', value: null });
            dispatchFormState({
              type: 'password-check',
              value: e.target.value,
            });
          }}
        />
        {formErrorsState['password-check'] && (
          <span className='mx-4 w-[220px] text-[0.625rem] text-accent-destructive-200'>
            {formErrorsState['password-check']}
          </span>
        )}
        <Button type='submit' color='accent'>
          Войти
        </Button>
        <Link
          className='ml-4 flex-grow-0 text-accent-primary-200 underline'
          href='/login'
        >
          Уже зарегистрирован
        </Link>
      </form>
    </section>
  );
};
