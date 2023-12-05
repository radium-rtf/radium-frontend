'use client';

import { Button, Card, Checkbox, Icon, cn } from '@/shared';
import { FC, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { answerSchema, answerSchemaType } from '../lib/answerSchema';
import { MultiChoiceSectionResponseDto } from '@/entities/CourseSection';
import { useAnswerMultiChoiceSectionMutation } from '../api/multiChoiceSectionApi';
import { useSession } from 'next-auth/react';
import { CourseEditContext } from '@/features/CourseEditContext';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MultiChoiceSectionEdit } from './MultiChoiceSectionEdit';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';

interface IProps {
  sectionData: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSection: FC<IProps> = ({ sectionData }) => {
  const [verdict, setVerdict] = useState<
    MultiChoiceSectionResponseDto['verdict']
  >(sectionData.verdict);
  const [answer, { isLoading, isError }] =
    useAnswerMultiChoiceSectionMutation();

  // Form init
  const { register, handleSubmit } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      multiChoice: {
        answer: sectionData.answers || [],
      },
    },
  });
  const onSubmitHandler: SubmitHandler<answerSchemaType> = (data) => {
    answer({
      id: sectionData.id,
      ...data,
    })
      .unwrap()
      .then((result) => {
        result && setVerdict(result.verdict);
      });
  };

  // Edit checks
  const { isEditing: isEditMode } = useContext(CourseEditContext);
  const [isEditing, setIsEditing] = useState(false);
  const session = useSession();
  const isEditAllowed =
    session.data?.user.roles.isAuthor ||
    session.data?.user.roles.isTeacher ||
    false;

  if (isEditAllowed && isEditMode && isEditing) {
    return (
      <MultiChoiceSectionEdit
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
                <Checkbox {...register('multiChoice.answer')} value={variant}>
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
