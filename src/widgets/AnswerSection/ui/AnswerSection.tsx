'use client';

import { Button, Card, cn, getNoun, Icon, TextArea } from '@/shared';
import { CSSProperties, FC, useContext, useState } from 'react';
import {
  AnswerSectionResponseDto,
  useAnswerCourseAnswerSectionMutation,
} from '@/entities/CourseSection';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../lib/answerSchema';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { AnswerSectionEdit } from './AnswerSectionEdit';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { Comment } from '@/widgets/Comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface AnswerSectionProps {
  sectionData: AnswerSectionResponseDto;
}

export const AnswerSection: FC<AnswerSectionProps> = ({ sectionData }) => {
  const [answer] = useAnswerCourseAnswerSectionMutation();

  // Form init
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting, isSubmitted, isValid },
  } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: {
        answer: sectionData.answer,
      },
    },
  });
  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answer({
      id: sectionData.id,
      ...data,
    })
      .unwrap()
      .then((res) => {
        if (res.verdict === 'WA') {
          setError('answer.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('answer.answer', { message: 'Ошибка!' }));
  };

  // Edit checks
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor || session.data?.user.roles.isTeacher || false;
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);

  const { setNodeRef, setActivatorNodeRef, transform, transition, listeners, isDragging } =
    useSortable({
      id: sectionData.id,
      data: {
        order: sectionData.order,
        pageId: sectionData.pageId,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  } as CSSProperties;

  if (isEditAllowed && isEditMode && isEditing) {
    return <AnswerSectionEdit sectionData={sectionData} onSuccess={() => setIsEditing(false)} />;
  }

  const answerValue = watch('answer.answer');

  return (
    <Card
      asChild
      id={`section-${sectionData.id}`}
      ref={setNodeRef}
      style={style}
      className={cn(
        'border border-transparent transition-colors duration-300',
        isDragging
          ? 'z-10 border-white/10 bg-[#2A2E2E]'
          : '[&:has(.drag:hover)]:border-white/10 [&:has(.drag:hover)]:bg-[#363A3B]'
      )}
    >
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmitHandler)}>
        <div
          className={cn(
            'text-primary-default flex items-center gap-4',
            isEditAllowed && isEditMode && 'relative'
          )}
        >
          <Icon type='task' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>Задание</span>
          {isEditAllowed && isEditMode && (
            <button
              className='drag after:absolute after:-left-6 after:-right-6 after:-top-6 after:bottom-0 after:block after:rounded-t-2xl after:content-[""]'
              type='button'
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <Icon type='handle-horizontal' className='absolute left-1/2 top-0' />
            </button>
          )}
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          <MarkdownDisplay markdown={sectionData.content} />
        </header>
        <main>
          <TextArea
            className='min-h-[6rem] w-full resize-y'
            placeholder='Ответ'
            {...register('answer.answer')}
          />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          {isEditAllowed && isEditMode && (
            <div className='flex items-center gap-4'>
              <CourseSectionDelete pageId={sectionData.pageId} sectionId={sectionData.id} />
              <Button className='w-64' color='outlined' onClick={() => setIsEditing(true)}>
                <Icon type='edit' className='text-inherit' />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Редактировать</span>
              </Button>
            </div>
          )}
          {(!isEditAllowed || !isEditMode) && (
            <>
              {!isSubmitting && (
                <>
                  <span className='text-text-primary text-[0.8125rem]'>
                    {sectionData.verdict === '' &&
                      `${sectionData.maxAttempts} ${getNoun(
                        sectionData.maxAttempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {sectionData.verdict !== '' &&
                      `Осталось ${sectionData.attempts} ${getNoun(
                        sectionData.attempts,
                        'попытка',
                        'попытки',
                        'попыток'
                      )}`}
                    {}
                  </span>
                  <span
                    className={cn(
                      'text-[0.8125rem]',
                      sectionData.verdict === 'REVIEWED' && 'text-secondary-default'
                    )}
                  >
                    {(sectionData.verdict === 'REVIEWED' &&
                      `${sectionData.score} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === 'WA' && `${0} / ${sectionData.maxScore}`) ||
                      (sectionData.verdict === '' && `${sectionData.maxScore}`)}
                    <span> баллов</span>
                  </span>
                </>
              )}
              <Button type='reset' onClick={() => reset({ answer: { answer: '' } })}>
                <Icon type='reset' />
              </Button>
              <Button
                className='w-64'
                color={
                  (!isValid && isSubmitted && 'destructive') ||
                  (sectionData.verdict === 'WAIT' &&
                    sectionData.answer === answerValue &&
                    'outlined') ||
                  'accent'
                }
                type='submit'
                disabled={
                  (!isValid && !isSubmitted) ||
                  (sectionData.verdict === 'WAIT' && sectionData.answer === answerValue) ||
                  isSubmitting ||
                  (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
                }
              >
                <Icon
                  type={
                    (sectionData.verdict === 'WAIT' && 'visible') ||
                    (isSubmitSuccessful && 'submit') ||
                    (isSubmitting && 'loading') ||
                    (!isValid && isSubmitted && 'alert') ||
                    'success'
                  }
                  className='shrink-0 text-inherit'
                />
                <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                  {(sectionData.verdict === 'WAIT' &&
                    sectionData.answer === answerValue &&
                    'Ждем оценки') ||
                    (errors.answer?.answer && errors.answer.answer.message) ||
                    'Ответить'}
                </span>
              </Button>
            </>
          )}
        </footer>
        {(!isEditAllowed || !isEditMode) && sectionData.review && (
          <Comment
            avatar={sectionData.review.reviewer.avatar}
            date={'12 сентября 2023, 14:00'}
            comment={sectionData.review.comment}
            name={sectionData.review.reviewer.name}
          />
        )}
      </form>
    </Card>
  );
};
