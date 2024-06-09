'use client';

import {
  AnswerSectionResponseDto,
  CourseSectionFooterEdit,
  CourseSectionHeaderEdit,
  useUpdateCourseAnswerSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent, TextArea, cn } from '@/shared';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { MarkdownEditor } from '@radium-ui-kit/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';

interface AnswerSectionEditProps {
  sectionData: AnswerSectionResponseDto;
}

export const AnswerSectionEdit: FC<AnswerSectionEditProps> = ({ sectionData }) => {
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
      answer: {
        question: sectionData.content,
      },
      maxAttempts: sectionData.maxAttempts,
      maxScore: sectionData.maxScore,
    },
  });

  const {
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = form;

  const [updateAnswerSection] = useUpdateCourseAnswerSectionMutation();

  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const response = await updateAnswerSection({
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
          <CourseSectionHeaderEdit isTask ref={setActivatorNodeRef} {...listeners} />
          {!isEditing && (
            <>
              <CardContent>
                <MarkdownDisplay markdown={sectionData.content} />
              </CardContent>
              <CardContent>
                <TextArea className='w-full resize-y' defaultValue={sectionData.answer} readOnly />
              </CardContent>
            </>
          )}
          {isEditing && (
            <CardContent className='flex flex-col gap-4'>
              <Controller
                control={control}
                name='answer.question'
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
              errors.answer?.question?.message ||
              errors.maxAttempts?.message ||
              errors.maxScore?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
