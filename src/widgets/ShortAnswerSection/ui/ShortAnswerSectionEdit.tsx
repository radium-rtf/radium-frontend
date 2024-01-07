'use client';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  cn,
} from '@/shared';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ShortAnswerSectionResponseDto,
  useUpdateCourseShortAnswerSectionMutation,
} from '@/entities/CourseSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';

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
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<updateSchemaType>({
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
        <CardFooter className='justify-end gap-4'>
          {isEditing && (
            <>
              <Input
                placeholder='Лимит'
                {...register('maxAttempts', {
                  valueAsNumber: true,
                  onChange: () => {
                    errors.root && clearErrors('root');
                  },
                })}
                text='попыток'
              />
              <Input
                placeholder='Лимит'
                {...register('maxScore', {
                  valueAsNumber: true,
                  onChange: () => {
                    errors.root && clearErrors('root');
                  },
                })}
                text='баллов'
              />
            </>
          )}
          <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
          {!isEditing && (
            <Button
              type='button'
              className='w-64 shrink-0 justify-start'
              variant='outline'
              onClick={() => setIsEditing(true)}
            >
              <Icon type='edit' className='text-inherit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>Редактировать</span>
            </Button>
          )}
          {isEditing && (
            <Button
              type='submit'
              className='w-64 shrink-0 justify-start'
              variant={!isValid && isSubmitted && !isSubmitting ? 'destructive' : 'outline'}
              disabled={isSubmitting}
              onClick={() => setIsEditing(true)}
            >
              <Icon type={isSubmitting ? 'loading' : 'save'} className='shrink-0 text-inherit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {(isSubmitting && 'Сохраняем...') ||
                  (!isValid &&
                    (errors.root?.message ||
                      errors.shortanswer?.question?.message ||
                      errors.shortanswer?.answer?.message ||
                      errors.maxScore?.message ||
                      errors.maxAttempts?.message)) ||
                  'Сохранить'}
              </span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
