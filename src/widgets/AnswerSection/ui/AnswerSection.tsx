'use client';

import { Button, Card, Icon, TextArea, cn } from '@/shared';
import { FC, useContext, useState } from 'react';
import { useAnswerAnswerSectionMutation } from '../api/shortAnswerSectionApi';
import { AnswerSectionResponseDto } from '@/entities/CourseSection';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchemaType } from '../lib/answerSchema';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { AnswerSectionEdit } from './AnswerSectionEdit';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';

interface AnswerSectionProps {
  sectionData: AnswerSectionResponseDto;
}

export const AnswerSection: FC<AnswerSectionProps> = ({ sectionData }) => {
  const [verdict, setVerdict] = useState<AnswerSectionResponseDto['verdict']>(
    sectionData.verdict
  );
  const [answerShortAnswerSection, { isLoading, isError }] =
    useAnswerAnswerSectionMutation();

  // Form init
  const { register, handleSubmit } = useForm<answerSchemaType>({
    defaultValues: {
      answer: {
        answer: sectionData.answer,
      },
    },
  });
  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answerShortAnswerSection({
      id: sectionData.id,
      ...data,
    })
      .unwrap()
      .then((result) => {
        result && setVerdict(result.verdict);
      });
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
      <AnswerSectionEdit
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
          <TextArea
            className='min-h-[6rem] w-full resize-y'
            placeholder='Ответ'
            {...register('answer.answer')}
          />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          {isEditAllowed && isEditMode && (
            <div className='flex items-center gap-4'>
              <CourseSectionDelete
                pageId={sectionData.pageId}
                sectionId={sectionData.id}
              />
              <Button
                className='w-64 shrink-0'
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
              <div className='flex flex-col gap-2 text-[0.8125rem]'>
                {verdict === 'OK' && (
                  <span className='text-secondary-default'>Верно!</span>
                )}
                {verdict === 'WA' && (
                  <span className='text-destructive-default'>
                    Не правильно!
                  </span>
                )}
              </div>
              {!isLoading && !isError && (
                <span
                  className={cn(
                    'text-[0.8125rem]',
                    verdict === 'OK' && 'text-secondary-default'
                  )}
                >
                  {verdict === 'OK' &&
                    `${sectionData.maxScore} / ${sectionData.maxScore}`}
                  {verdict === 'WA' && `${0} / ${sectionData.maxScore}`}
                  {verdict === '' && `${sectionData.maxScore}`}
                  <span> баллов</span>
                </span>
              )}
              <Button type='reset'>Сбросить</Button>
              <Button disabled={isLoading} type='submit' color='accent'>
                Ответить
              </Button>
            </>
          )}
        </footer>
      </form>
    </Card>
  );
};
