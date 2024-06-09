'use client';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownEditor } from '@radium-ui-kit/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { Card, CardContent, CardHeader, CardTitle, Icon, Input, cn } from '@/shared';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  CourseSectionFooterEdit,
  ShortAnswerSectionResponseDto,
  useUpdateCourseShortAnswerSectionMutation,
} from '@/entities/CourseSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';

interface ShortAnswerSectionEditProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSectionEdit: FC<ShortAnswerSectionEditProps> = ({ sectionData }) => {
  // Edit setup
  const [isEditing, setIsEditing] = useState(false);
  // DND Setup
  const { setActivatorNodeRef, setNodeRef, listeners, transform, transition, isDragging } =
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

  // Form setup
  const form = useForm<updateSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(updateSchema),
    defaultValues: {
      shortanswer: {
        question: sectionData.content,
        answer: sectionData.answer,
      },
      maxAttempts: sectionData.maxAttempts,
      maxScore: sectionData.maxScore,
    },
  });

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = form;

  const [updateShortAnswerSection] = useUpdateCourseShortAnswerSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const response = await updateShortAnswerSection({
      sectionId: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      setIsEditing(false);
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  // Escape control setup
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsEditing(false);
      }
    };
    if (isEditing) {
      document.body.addEventListener('keydown', listener);
    }
    return () => {
      document.body.removeEventListener('keydown', listener);
    };
  }, [isEditing]);

  return (
    <FormProvider {...form}>
      <Card
        ref={setNodeRef}
        style={style}
        className={cn(
          'border border-transparent transition-colors',
          isDragging
            ? 'z-10 border-white/10 bg-[#2A2E2E]'
            : '[&:has(.drag:hover)]:border-white/10 [&:has(.drag:hover)]:bg-[#363A3B]'
        )}
      >
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CardHeader className='relative flex-row items-center gap-4 space-y-0'>
            <Icon type='question' className='shrink-0 text-primary' />
            <CardTitle className='text-base'>Вопрос</CardTitle>
            <button
              ref={setActivatorNodeRef}
              {...listeners}
              type='button'
              className='drag absolute inset-0 rounded-sm'
            >
              <Icon
                type='handle-horizontal'
                className='absolute right-1/2 top-[2.25rem] -translate-y-1/2 translate-x-1/2'
              />
            </button>
          </CardHeader>
          {!isEditing && (
            <>
              <CardContent>
                <MarkdownDisplay markdown={sectionData.content} />
              </CardContent>
              <CardContent>
                <Input
                  placeholder='Ответ'
                  {...register('shortanswer.answer', {
                    onChange: () => errors.root && clearErrors('root'),
                  })}
                />
              </CardContent>
            </>
          )}
          {isEditing && (
            <>
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='shortanswer.question'
                  render={({ field: { value, onChange } }) => (
                    <MarkdownEditor
                      markdown={value}
                      onChange={(value) => {
                        onChange(value);
                        errors.root && clearErrors('root');
                      }}
                    />
                  )}
                />
              </CardContent>
              <CardContent className='flex items-center gap-4'>
                <Icon type='question' className='shrink-0 text-primary' />
                <CardTitle className='text-base'>Ответ</CardTitle>
              </CardContent>
              <CardContent>
                <Input
                  placeholder='Правильный ответ (поддерживает RegEx)'
                  {...register('shortanswer.answer')}
                />
              </CardContent>
            </>
          )}
          <CourseSectionFooterEdit
            hasScore
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            deleteButton={
              <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
            }
            errorMessage={
              errors.root?.message ||
              errors.shortanswer?.question?.message ||
              errors.shortanswer?.answer?.message ||
              errors.maxScore?.message ||
              errors.maxAttempts?.message ||
              'Сохранить'
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
