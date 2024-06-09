import {
  CourseSectionFooterEdit,
  TextSectionResponseDto,
  useUpdateCourseTextSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent, CardHeader, Icon, cn } from '@/shared';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
import { MarkdownEditor } from '@radium-ui-kit/MarkdownEditor';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
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
      text: {
        content: sectionData.content,
      },
    },
  });

  const {
    handleSubmit,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = form;

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
          <CourseSectionFooterEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            deleteButton={
              <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
            }
            errorMessage={errors.root?.message || errors.text?.content?.message}
          />
        </form>
      </Card>
    </FormProvider>
  );
};
