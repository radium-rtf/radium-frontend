'use client';

import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { ChoiceSectionEdit } from './ChoiceSectionEdit';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FC, useContext, useState } from 'react';
import { ChoiceSectionResponseDto } from '@/entities/CourseSection';
import { Button, Card, Icon, Radio, cn, getNoun } from '@/shared';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { useAnswerCourseChoiceSectionMutation } from '@/entities/CourseSection';

interface ChoiceSectionProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSection: FC<ChoiceSectionProps> = ({ sectionData }) => {
  // Edit checks
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;

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
      choice: { answer: sectionData.answer },
    },
  });

  const [answer] = useAnswerCourseChoiceSectionMutation();

  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (body) => {
    await answer({
      id: sectionData.id,
      ...body,
    })
      .unwrap()
      .then((res) => {
        if (res.verdict === 'WA') {
          setError('choice.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('choice.answer', { message: 'Ошибка!' }));
  };

  if (isEditAllowed && isEditMode && isEditing) {
    return (
      <ChoiceSectionEdit
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
          <MarkdownDisplay markdown={sectionData.content} />
        </header>
        <main>
          <ul>
            {sectionData.variants.map((variant) => (
              <li key={variant} className='py-2'>
                <Radio value={variant} {...register('choice.answer')}>
                  {variant}
                </Radio>
              </li>
            ))}
          </ul>
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
                onClick={() => reset({ choice: { answer: '' } })}
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
                  {(errors.choice?.answer && errors.choice.answer.message) ||
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
