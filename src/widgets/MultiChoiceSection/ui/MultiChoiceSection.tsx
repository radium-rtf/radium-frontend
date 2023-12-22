'use client';

import { Button, Card, Checkbox, Icon, cn, getNoun } from '@/shared';
import { CSSProperties, FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import {
  MultiChoiceSectionResponseDto,
  useAnswerCourseMultiChoiceSectionMutation,
} from '@/entities/CourseSection';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MultiChoiceSectionEdit } from './MultiChoiceSectionEdit';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface IProps {
  sectionData: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSection: FC<IProps> = ({ sectionData }) => {
  const [answer] = useAnswerCourseMultiChoiceSectionMutation();

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
      multiChoice: { answer: sectionData.answers || [] },
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
          setError('multiChoice.answer', { message: 'Неправильно!' });
        }
      })
      .catch(() => setError('multiChoice.answer', { message: 'Ошибка!' }));
  };

  // Edit checks
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;

  const {
    setNodeRef,
    setActivatorNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
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
    return (
      <MultiChoiceSectionEdit
        sectionData={sectionData}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

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
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div
          className={cn(
            'flex items-center gap-4 text-primary-default',
            isEditAllowed && isEditMode && 'relative'
          )}
        >
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
          {isEditAllowed && isEditMode && (
            <button
              className='drag after:absolute after:-left-6 after:-right-6 after:-top-6 after:bottom-0 after:block after:rounded-t-2xl after:content-[""]'
              type='button'
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <Icon
                type='handle-horizontal'
                className='absolute left-1/2 top-0'
              />
            </button>
          )}
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          <MarkdownDisplay markdown={sectionData.content} />
        </header>
        <main>
          <ul>
            {sectionData.variants.map((variant) => (
              <li key={variant} className='py-2'>
                <Checkbox value={variant} {...register(`multiChoice.answer`)}>
                  {variant}
                </Checkbox>
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
                  {sectionData.maxAttempts > 0 && (
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
                          sectionData.attempts,
                          'попытка',
                          'попытки',
                          'попыток'
                        )}`}
                      {}
                    </span>
                  )}
                  {sectionData.maxScore > 0 && (
                    <span
                      className={cn(
                        'text-[0.8125rem]',
                        sectionData.verdict === 'OK' && 'text-secondary-default'
                      )}
                    >
                      {(sectionData.verdict === 'OK' &&
                        `${sectionData.score} / ${sectionData.maxScore}`) ||
                        (sectionData.verdict === 'WA' &&
                          `${0} / ${sectionData.maxScore}`) ||
                        (sectionData.verdict === '' &&
                          `${sectionData.maxScore}`)}
                      <span> баллов</span>
                    </span>
                  )}
                </>
              )}
              <Button
                type='reset'
                onClick={() => reset({ multiChoice: { answer: [] } })}
              >
                <Icon type='reset' />
              </Button>
              <Button
                className='w-64'
                color={(!isValid && isSubmitted && 'destructive') || 'accent'}
                type='submit'
                disabled={
                  (!isValid && !isSubmitted) ||
                  isSubmitting ||
                  (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
                }
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
                  {(errors.multiChoice?.answer &&
                    errors.multiChoice.answer.message) ||
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
