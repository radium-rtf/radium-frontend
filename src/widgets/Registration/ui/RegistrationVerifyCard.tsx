'use client';
import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, CardContent, CardFooter, CardHeader, Icon, Input } from '@/shared';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  registrationVerifySchema,
  registrationVerifySchemaType,
} from '../model/registrationVerifySchema';

export const VerifyRegistrationCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    router.push('/registration');
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful, isSubmitted, isValid, errors },
  } = useForm<registrationVerifySchemaType>({
    resolver: zodResolver(registrationVerifySchema),
    defaultValues: {
      email: email!,
      verificationCode: '',
    },
  });

  const onSubmitHandler: SubmitHandler<registrationVerifySchemaType> = async ({
    email,
    verificationCode,
  }) => {
    const response = await signIn('verifyRegistration', {
      email: email.toLowerCase(),
      verificationCode,
      redirect: false,
    });
    if (!response || (!response.ok && response.error)) {
      setError('verificationCode', { message: 'Неверный код' }, { shouldFocus: true });
      return;
    }
    router.push('/');
  };

  return (
    <section className='flex w-[19rem] flex-col items-center gap-9'>
      <div className='flex items-center gap-4'>
        <Image height={28} width={48} alt='Radium logo' src='/logo.svg' />
        <h1 className='text-4xl font-NTSomic font-bold text-primary'>Радиум</h1>
      </div>
      <Card className='w-full'>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CardHeader>
            <span className='text-text-primary text-[0.8125rem]'>
              Отправили 6-значный код на почту. Введите его здесь, чтобы завершить регистрацию.
            </span>
          </CardHeader>
          <CardContent>
            <Input icon='hashtag' placeholder='6-значный код' {...register('verificationCode')} />
          </CardContent>
          <CardFooter>
            <Button
              className='w-64 justify-start'
              type='submit'
              color={!isValid && isSubmitted ? 'destructive' : 'accent'}
              disabled={isSubmitting}
            >
              <Icon
                type={isSubmitting ? 'loading' : isValid ? 'alert' : 'enter'}
                className='shrink-0 text-inherit'
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2 whitespace-nowrap'>
                {(isSubmitSuccessful && 'Успех!') ||
                  (errors.email && errors.email.message) ||
                  (errors.verificationCode && errors.verificationCode.message) ||
                  'Подтвердить'}
              </span>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};
