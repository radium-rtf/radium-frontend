import {
  TextSectionResponseDto,
  useUpdateCourseTextSectionMutation,
} from '@/entities/CourseSection';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Icon,
  cn,
} from '@/shared';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateScheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';

interface TextSectionEditProps {
  sectionData: TextSectionResponseDto;
}

export const TextSectionEdit: FC<TextSectionEditProps> = ({ sectionData }) => {
  // Edit setup
  const [isEditing, setIsEditing] = useState(false);
  // DND Setup
  const {
    setActivatorNodeRef,
    setNodeRef,
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

  // Form setup
  const {
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
      text: {
        content: sectionData.content,
      },
    },
  });

  console.log(errors);

  const [updateTextSection] = useUpdateCourseTextSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const response = await updateTextSection({
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
        <CardHeader className='relative items-center justify-center space-y-0'>
          <button
            ref={setActivatorNodeRef}
            {...listeners}
            type='button'
            className='drag before:absolute before:inset-0 before:block before:content-[""]'
          >
            <Icon type='handle-horizontal' />
          </button>
        </CardHeader>
        <CardContent>
          {!isEditing && <MarkdownDisplay markdown={sectionData.content} />}
          {isEditing && (
            <Controller
              control={control}
              name='text.content'
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
          )}
        </CardContent>
        <CardFooter className='justify-end gap-4'>
          <CourseSectionDelete
            sectionId={sectionData.id}
            pageId={sectionData.pageId}
          />
          {!isEditing && (
            <Button
              type='button'
              className='w-64 shrink-0 justify-start'
              variant='outline'
              onClick={() => setIsEditing(true)}
            >
              <Icon type='edit' className='text-inherit' />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                Редактировать
              </span>
            </Button>
          )}
          {isEditing && (
            <Button
              type='submit'
              className='w-64 shrink-0 justify-start'
              variant={
                !isValid && isSubmitted && !isSubmitting
                  ? 'destructive'
                  : 'outline'
              }
              disabled={isSubmitting}
              onClick={() => setIsEditing(true)}
            >
              <Icon
                type={isSubmitting ? 'loading' : 'save'}
                className='text-inherit'
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {(isSubmitting && 'Сохраняем...') ||
                  errors.root?.message ||
                  errors.text?.content?.message ||
                  'Сохранить'}
              </span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
