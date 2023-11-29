'use client';

import { Button, Card, Icon, Input, cn } from '@/shared';
import { FC, useContext, useState } from 'react';
import { useAnswerShortAnswerSectionMutation } from '../api/shortAnswerSectionApi';
import { ShortAnswerSectionResponseDto } from '@/entities/Section';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchemaType } from '../lib/answerSchema';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { ShortAnswerSectionEdit } from './ShortAnswerSectionEdit';

interface IProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSection: FC<IProps> = ({ sectionData }) => {
  const [verdict, setVerdict] = useState<
    ShortAnswerSectionResponseDto['verdict']
  >(sectionData.verdict);
  const [answerShortAnswerSection, { isLoading, isError }] =
    useAnswerShortAnswerSectionMutation();

  // Form init
  const { register, handleSubmit } = useForm<answerSchemaType>({
    defaultValues: {
      shortanswer: {
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
