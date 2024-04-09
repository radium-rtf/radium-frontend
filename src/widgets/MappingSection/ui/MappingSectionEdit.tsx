'use client';

import {
  CourseSectionFooterEdit,
  CourseSectionHeaderEdit,
  MappingSectionResponseDto,
  useUpdateCourseMappingSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent, CardTitle, Icon, Input, cn } from '@/shared';
import { CSSProperties, FC, Fragment, useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  SortableContext,
  rectSwappingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { MappingDraggable } from './MappingDraggable';
import { CSS } from '@dnd-kit/utilities';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { MappingEditDraggable } from './MappingEditDraggable';
import { SECTION_MAX_ANSWERS_COUNT } from '@/entities/Course';

interface MappingSectionEditProps {
  sectionData: MappingSectionResponseDto;
}

export const MappingSectionEdit: FC<MappingSectionEditProps> = ({ sectionData }) => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    if (
      event.over?.data.current?.sortable.index !==
      event.over?.data.current?.sortable.items.length - 1
    ) {
      const { active, over } = event;
      const oldIndex = answerFields.findIndex((answer) => answer.id === active.id);
      const newIndex = answerFields.findIndex((answer) => answer.id === over?.id);

      swap(oldIndex, newIndex);
    }
  };

  // Form setup
  const form = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: sectionData.maxAttempts,
      mapping: {
        question: sectionData.content,
        keys: sectionData.keys.map((item) => ({ value: item })).concat([{ value: '' }]),
        answer: (sectionData.answers || sectionData.variants)
          .map((item) => ({
            value: item,
          }))
          .concat([{ value: '' }]),
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    getValues,
    setFocus,
    clearErrors,
    setError,
    formState: { errors },
  } = form;

  const {
    fields: keysFields,
    remove: keysRemove,
    append: keysAppend,
  } = useFieldArray({
    control: control,
    name: 'mapping.keys',
  });

  const {
    fields: answerFields,
    append: answerAppend,
    remove: answerRemove,
    swap,
  } = useFieldArray({
    control: control,
    name: 'mapping.answer',
  });

  const [updateMappingSection] = useUpdateCourseMappingSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const body = {
      ...data,
      mapping: {
        ...data.mapping,
        answer: data.mapping.answer.map((item) => item.value),
        keys: data.mapping.keys.map((item) => item.value),
      },
    };
    const response = await updateMappingSection({
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
                <DndContext
                  sensors={sensors}
                  modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                  collisionDetection={closestCorners}
                >
                  <SortableContext
                    items={answerFields.toSpliced(-1, 1)}
                    strategy={rectSwappingStrategy}
                  >
                    <div className='grid grid-cols-2 gap-4'>
                      <Controller
                        control={control}
                        name='mapping.answer'
                        render={() => {
                          return (
                            <>
                              {answerFields.toSpliced(-1, 1).map((field, index) => {
                                return (
                                  <Fragment key={field.id}>
                                    <span className='text-foreground-default flex-grow rounded-[0.5rem] border border-white/5 px-4 py-2 text-[0.8125rem] leading-normal'>
                                      {sectionData.keys[index]}
                                    </span>
                                    <MappingDraggable data={field} />
                                  </Fragment>
                                );
                              })}
                            </>
                          );
                        }}
                      />
                    </div>
                  </SortableContext>
                </DndContext>
              </CardContent>
            </>
          )}
          {isEditing && (
            <>
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='mapping.question'
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
                  onDragEnd={handleDragEnd}
                  sensors={sensors}
                  modifiers={[restrictToParentElement, restrictToVerticalAxis]}
                  collisionDetection={closestCorners}
                >
                  <SortableContext items={answerFields} strategy={rectSwappingStrategy}>
                    <main className='grid grid-cols-2 gap-4'>
                      {answerFields.map((field, index) => {
                        return (
                          <Fragment key={field.id}>
                            <Input
                              placeholder={`Строка ${index + 1}`}
                              {...register(`mapping.keys.${index}.value`, {
                                onChange: (e) => {
                                  // Remove answer if key and answer is empty
                                  if (
                                    e.target.value === '' &&
                                    getValues(`mapping.answer.${index}.value`) === '' &&
                                    index !== keysFields.length - 1
                                  ) {
                                    answerRemove(index);
                                    keysRemove(index);
                                    setFocus(
                                      `mapping.keys.${
                                        keysFields.length - 3 >= 0 ? keysFields.length - 3 : 0
                                      }.value`
                                    );
                                  }

                                  // add new answer if key is not empty and not 10
                                  if (
                                    e.target.value !== '' &&
                                    index === keysFields.length - 1 &&
                                    keysFields.length < SECTION_MAX_ANSWERS_COUNT
                                  ) {
                                    answerAppend({ value: '' }, { shouldFocus: false });
                                    keysAppend({ value: '' }, { shouldFocus: false });
                                  }
                                },
                              })}
                            />
                            <MappingEditDraggable
                              disabled={index === keysFields.length - 1}
                              data={answerFields[index]}
                              placeholder={`Вариант ${index + 1}`}
                              {...register(`mapping.answer.${index}.value`, {
                                onChange: (e) => {
                                  // Remove answer if key and answer is empty
                                  if (
                                    e.target.value === '' &&
                                    getValues(`mapping.keys.${index}.value`) === '' &&
                                    index !== keysFields.length - 1
                                  ) {
                                    answerRemove(index);
                                    keysRemove(index);
                                    setFocus(
                                      `mapping.keys.${
                                        keysFields.length - 3 >= 0 ? keysFields.length - 3 : 0
                                      }.value`
                                    );
                                  }

                                  // add new answer if key is not empty and not 10
                                  if (
                                    e.target.value !== '' &&
                                    index === keysFields.length - 1 &&
                                    keysFields.length < SECTION_MAX_ANSWERS_COUNT
                                  ) {
                                    answerAppend({ value: '' }, { shouldFocus: false });
                                    keysAppend({ value: '' }, { shouldFocus: false });
                                  }
                                },
                              })}
                            />
                          </Fragment>
                        );
                      })}
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
              errors.mapping?.question?.message ||
              errors.mapping?.keys?.root?.message ||
              errors.mapping?.answer?.find?.((v) => v?.value?.message)?.value?.message ||
              errors.mapping?.answer?.root?.message ||
              errors.mapping?.answer?.message ||
              errors.mapping?.keys?.find?.((v) => v?.value?.message)?.value?.message ||
              errors.mapping?.keys?.root?.message ||
              errors.mapping?.keys?.message ||
              errors.maxAttempts?.message ||
              errors.maxScore?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
