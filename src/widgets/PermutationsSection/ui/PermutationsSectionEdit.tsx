'use client';

import {
  CourseSectionFooterEdit,
  CourseSectionHeaderEdit,
  PermutationSectionResponseDto,
  useUpdateCoursePermutationsSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent, CardTitle, Icon, cn } from '@/shared';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { dragEndHandler } from '../model/dragEndHandler';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { PermutationsEditItem } from './PermutationsEditItem';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { PermutationItem } from './PermutationItem';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';

interface PermutationsSectionEditProps {
  sectionData: PermutationSectionResponseDto;
}

export const PermutationSectionEdit: FC<PermutationsSectionEditProps> = ({ sectionData }) => {
  // Edit setup
  const [isEditing, setIsEditing] = useState(false);

  // Section DND Setup
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

  // Answers DND setup
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Form setup
  const form = useForm<updateSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(updateSchema),
    defaultValues: {
      permutation: {
        question: sectionData.content,
        answer:
          sectionData.variants.length < 10
            ? sectionData.variants
                .map((v) => ({
                  value: v,
                }))
                .concat([{ value: '' }])
            : sectionData.variants.map((v) => ({
                value: v,
              })),
      },
      maxAttempts: sectionData.maxAttempts,
      maxScore: sectionData.maxScore,
    },
  });

  const {
    control,
    register,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'permutation.answer',
  });

  const [updatePermutationsSection] = useUpdateCoursePermutationsSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const body = {
      ...data,
      permutation: {
        ...data.permutation,
        answer: data.permutation.answer.map((o) => o.value),
      },
    };
    const response = await updatePermutationsSection({
      sectionId: sectionData.id,
      ...body,
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
          <CourseSectionHeaderEdit ref={setActivatorNodeRef} {...listeners} />
          {!isEditing && (
            <>
              <CardContent>
                <MarkdownDisplay markdown={sectionData.content} />
              </CardContent>
              <CardContent>
                <div className='-mx-6'>
                  <DndContext
                    collisionDetection={rectIntersection}
                    modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                    sensors={sensors}
                  >
                    <SortableContext items={fields.toSpliced(-1, 1)}>
                      {fields.toSpliced(-1, 1).map((field) => (
                        <PermutationItem key={field.id} value={field} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </CardContent>
            </>
          )}
          {isEditing && (
            <>
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='permutation.question'
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
                <DndContext
                  collisionDetection={rectIntersection}
                  onDragEnd={(e) => {
                    if (e.over?.data.current?.sortable.index !== fields.length - 1) {
                      dragEndHandler(e, fields, move);
                    }
                  }}
                  modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                  sensors={sensors}
                >
                  <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                    <main className='-mx-6 flex flex-col gap-4'>
                      {fields.map((field, index) => (
                        <PermutationsEditItem
                          key={field.id}
                          value={field}
                          placeholder={`Вариант ${index + 1}`}
                          disabled={index === fields.length - 1}
                          {...register(`permutation.answer.${index}.value`, {
                            onChange: (e) => {
                              // add if last input has text
                              if (
                                e.target.value !== '' &&
                                index === fields.length - 1 &&
                                fields.length < 10
                              ) {
                                append({ value: '' }, { shouldFocus: false });
                              }
                              // remove if NOT last empty
                              if (e.target.value === '' && index !== fields.length - 1) {
                                remove(index);
                                setFocus(
                                  `permutation.answer.${
                                    fields.length - 3 >= 0 ? fields.length - 3 : 0
                                  }.value`
                                );
                              }
                            },
                          })}
                        />
                      ))}
                    </main>
                  </SortableContext>
                </DndContext>
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
              errors.permutation?.question?.message ||
              errors.permutation?.answer?.message ||
              errors.permutation?.answer?.find?.((v) => v?.value?.message)?.value?.message ||
              errors.permutation?.answer?.root?.message ||
              errors.permutation?.answer?.message ||
              errors.maxAttempts?.message ||
              errors.maxScore?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
