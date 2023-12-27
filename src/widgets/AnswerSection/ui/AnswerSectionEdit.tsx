'use client';

import {
  AnswerSectionResponseDto,
  useUpdateCourseAnswerSectionMutation,
} from '@/entities/CourseSection';
import { Button, Card, Icon, Input, cn } from '@/shared';
import { CSSProperties, FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../lib/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface AnswerSectionEditProps {
  sectionData: AnswerSectionResponseDto;
  onSuccess: () => void;
}

export const AnswerSectionEdit: FC<AnswerSectionEditProps> = ({ sectionData, onSuccess }) => {
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

  const { setNodeRef, setActivatorNodeRef, listeners, transform, transition, isDragging } =
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
        <div className='text-primary-default flex items-center gap-4'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>Вопрос</span>
        </div>
        <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
          <Controller
            name='answer.question'
            control={control}
            render={({ field }) => (
              <MarkdownEditor markdown={sectionData.content} onChange={field.onChange} />
            )}
          />
        </header>
        <div className='text-primary-default relative flex items-center gap-4'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>Ответ</span>
          <button
            className='drag after:absolute after:-left-6 after:-right-6 after:-top-6 after:bottom-0 after:block after:rounded-t-2xl after:content-[""]'
            type='button'
            ref={setActivatorNodeRef}
            {...listeners}
          >
            <Icon type='handle-horizontal' className='absolute left-1/2 top-0' />
          </button>
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
          <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
          <Button className='w-64 flex-shrink-0' color='outlined' type='submit' disabled={!isValid}>
            <Icon type='save' className='text-inherit' />
            <span className='ml-[calc(50%-34px)] -translate-x-1/2'>Сохранить</span>
          </Button>
        </footer>
        {errors.answer?.question && <p>{errors.answer.question.message}</p>}
      </form>
    </Card>
  );
};
