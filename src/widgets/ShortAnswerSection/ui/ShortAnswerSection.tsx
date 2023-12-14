'use client';

import { Button, Card, Icon, Input, cn, getNoun } from '@/shared';
import { FC, useContext, useState } from 'react';
import {
  ShortAnswerSectionResponseDto,
  useAnswerCourseShortAnswerSectionMutation,
} from '@/entities/CourseSection';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { ShortAnswerSectionEdit } from './ShortAnswerSectionEdit';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSection: FC<IProps> = ({ sectionData }) => {
  const [answer] = useAnswerCourseShortAnswerSectionMutation();

  // Form init
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: {
      errors,
      isSubmitSuccessful,
      isSubmitting,
      isSubmitted,
      isValid,
    },
  } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      shortanswer: {
        answer: sectionData.answer,
      },
    },
  });
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (body) => {
    await answer({
      id: sectionData.id,
      ...body,
    })
      .unwrap()
      .then((res) => {
        if (res.verdict === 'WA') {
          setError('shortanswer.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('shortanswer.answer', { message: 'Ошибка!' }));
  };

  // Edit checks
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);

  if (isEditAllowed && isEditMode && isEditing) {
    return (
      <ShortAnswerSectionEdit
        sectionData={sectionData}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Card asChild>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          {sectionData.content}
        </header>
        <main>
          <Input placeholder='Ответ' {...register('shortanswer.answer')} />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          {isEditAllowed && isEditMode && (
            <div className='flex items-center gap-4'>
              <CourseSectionDelete
                pageId={sectionData.pageId}
                sectionId={sectionData.id}
              />
              <Button
                className='w-64'
                color='outlined'
                onClick={() => setIsEditing(true)}
              >
                <Icon type='edit' className='text-inherit' />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                  Редактировать
                </span>
              </Button>
            </div>
          )}
          {(!isEditAllowed || !isEditMode) && (
            <>
              {!isSubmitting && (
                <>
                  <span className='text-[0.8125rem] text-text-primary'>
                    {sectionData.verdict === '' &&
                      `${sectionData.maxAttempts} ${getNoun(
                        sectionData.maxAttempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {sectionData.verdict !== '' &&
                      `Осталось ${sectionData.attempts} ${getNoun(
                        sectionData.maxAttempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {}
                  </span>
                  <span
                    className={cn(
                      'text-[0.8125rem]',
                      sectionData.verdict === 'OK' && 'text-secondary-default'
                    )}
                  >
                    {(sectionData.verdict === 'OK' &&
                      `${sectionData.maxScore} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === 'WA' &&
                        `${0} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === '' && `${sectionData.maxScore}`)}
                    <span> баллов</span>
                  </span>
                </>
              )}
              <Button
                type='reset'
                onClick={() => reset({ shortanswer: { answer: '' } })}
              >
                <Icon type='reset' />
              </Button>
              <Button
                className='w-64'
                color={(!isValid && isSubmitted && 'destructive') || 'accent'}
                type='submit'
                disabled={(!isValid && !isSubmitted) || isSubmitting}
              >
                <Icon
                  type={
                    (isSubmitSuccessful && 'submit') ||
                    (isSubmitting && 'loading') ||
                    (!isValid && isSubmitted && 'alert') ||
                    'success'
                  }
                  className='shrink-0 text-inherit'
                />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                  {(errors.shortanswer?.answer &&
                    errors.shortanswer.answer.message) ||
                    'Ответить'}
                </span>
              </Button>
            </>
          )}
        </footer>
      </form>
    </Card>
  );
};
