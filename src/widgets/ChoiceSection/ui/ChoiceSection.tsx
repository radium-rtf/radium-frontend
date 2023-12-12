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
import { Button, Card, Icon, Radio, cn } from '@/shared';
import { answerSchema, answerSchemaType } from '../lib/answerSchema';
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

  const [verdict, setVerdict] = useState<ChoiceSectionResponseDto['verdict']>(
    sectionData.verdict
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
  });

  const [answer, { isLoading, isError }] =
    useAnswerCourseChoiceSectionMutation();

  const onSubmitHandler: SubmitHandler<answerSchemaType> = (body) => {
    answer({
      id: sectionData.id,
      ...body,
    })
      .unwrap()
      .then((result) => {
        result && setVerdict(result.verdict);
      });
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
                <Radio
                  defaultChecked={sectionData.answer === variant}
                  value={variant}
                  {...register('choice.answer')}
                >
                  {variant}
                </Radio>
              </li>
            ))}
          </ul>
          {errors.choice?.answer && <p>{errors.choice.answer.message}</p>}
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
                  <span className='text-destructive-default'>Неправильно!</span>
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
