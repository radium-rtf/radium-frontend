'use client';

import {
  AnswerSectionResponseDto,
  useUpdateCourseAnswerSectionMutation,
} from '@/entities/CourseSection';
import { Button, Card, Icon, Input } from '@/shared';
import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../lib/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface AnswerSectionEditProps {
  sectionData: AnswerSectionResponseDto;
  onSuccess: () => void;
}

export const AnswerSectionEdit: FC<AnswerSectionEditProps> = ({
  sectionData,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: sectionData.maxAttempts,
      answer: {
        question: sectionData.content,
      },
    },
  });

  const [updateShortAnswerSection] = useUpdateCourseAnswerSectionMutation();

  const onSubmitHandler: SubmitHandler<updateSchemaType> = (data) => {
    updateShortAnswerSection({ sectionId: sectionData.id, ...data })
      .unwrap()
      .then(onSuccess);
  };

  return (
    <>
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
          <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
            <Controller
              name='answer.question'
              control={control}
              render={({ field }) => (
                <MarkdownEditor
                  markdown={sectionData.content}
                  onChange={field.onChange}
                />
              )}
            />
          </header>
          <div className='flex items-center gap-4 text-primary-default'>
            <Icon type='question' className='text-inherit' />
            <span className='font-mono font-bold leading-[normal] text-inherit'>
              Ответ
            </span>
          </div>
          {/* <main>
            <Input {...register('answer.answer')} />
          </main> */}
          <footer className='flex items-center gap-4 place-self-end'>
            <Input
              className='flex-shrink'
              {...register('maxAttempts', { valueAsNumber: true })}
              placeholder='Максимум'
            >
              <span className='font-sans text-[0.625rem]'>попыток</span>
            </Input>
            <Input
              className='flex-shrink'
              {...register('maxScore', { valueAsNumber: true })}
              placeholder='Максимум'
            >
              <span className='font-sans text-[0.625rem]'>баллов</span>
            </Input>
            <CourseSectionDelete
              sectionId={sectionData.id}
              pageId={sectionData.pageId}
            />
            <Button
              className='w-64 flex-shrink-0'
              color='outlined'
              type='submit'
              disabled={!isValid}
            >
              <Icon type='save' className='text-inherit' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Сохранить
              </span>
            </Button>
          </footer>
          {errors.answer?.question && <p>{errors.answer.question.message}</p>}
        </form>
      </Card>
    </>
  );
};
