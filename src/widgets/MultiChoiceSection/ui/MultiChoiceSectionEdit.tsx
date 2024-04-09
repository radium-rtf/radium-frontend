'use client';

import {
  CourseSectionFooterEdit,
  CourseSectionHeaderEdit,
  MultiChoiceSectionResponseDto,
  useUpdateCourseMultiChoiceSectionMutation,
} from '@/entities/CourseSection';
import { Card, CardContent, CardTitle, Checkbox, Icon, Input, cn } from '@/shared';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';

interface MultiChoiceSectionEditProps {
  sectionData: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSectionEdit: FC<MultiChoiceSectionEditProps> = ({ sectionData }) => {
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
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: sectionData.maxAttempts,
      multichoice: {
        answer: [],
        question: sectionData.content,
        variants:
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
    },
  });

  const {
    control,
    setError,
    setValue,
    setFocus,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'multichoice.variants',
  });

  const [updateMultiChoiceSection] = useUpdateCourseMultiChoiceSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const body = {
      ...data,
      multichoice: {
        ...data.multichoice,
        variants: data.multichoice.variants.map((o) => o.value),
      },
    };
    const response = await updateMultiChoiceSection({
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
                {sectionData.variants.map((variant) => (
                  <div key={variant} className='flex items-center gap-4 py-2'>
                    <Checkbox id={`${sectionData.id}-${variant}`} />
                    <label
                      htmlFor={`${sectionData.id}-${variant}`}
                      className='text-[0.8125rem] leading-normal'
                    >
                      {variant}
                    </label>
                  </div>
                ))}
              </CardContent>
            </>
          )}
          {isEditing && (
            <>
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='multichoice.question'
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
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='multichoice.answer'
                  render={({ field: answerField }) => (
                    <>
                      {fields.map((field, index) => {
                        return (
                          <div key={field.id} className='flex items-center gap-4'>
                            <Controller
                              control={control}
                              name={`multichoice.variants.${index}.value`}
                              render={({ field: inputField }) => (
                                <>
                                  <Checkbox
                                    id={`${sectionData.id}-${field.id}`}
                                    value={inputField.value}
                                    checked={answerField.value.includes(inputField.value)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? answerField.onChange([
                                            ...answerField.value,
                                            inputField.value,
                                          ])
                                        : answerField.onChange(
                                            answerField.value?.filter(
                                              (value) => value !== inputField.value
                                            )
                                          );
                                    }}
                                  />
                                  <Input
                                    placeholder={`Вариант ${index + 1}`}
                                    {...inputField}
                                    onChange={(e) => {
                                      inputField.onChange(e);

                                      if (answerField.value.includes(inputField.value)) {
                                        const index = answerField.value.findIndex(
                                          (v) => v === inputField.value
                                        );

                                        if (index !== -1) {
                                          setValue(
                                            'multichoice.answer',
                                            e.target.value
                                              ? answerField.value.toSpliced(
                                                  index,
                                                  1,
                                                  e.target.value
                                                )
                                              : answerField.value.toSpliced(index, 1)
                                          );
                                        }
                                      }
                                      if (
                                        e.target.value !== '' &&
                                        index === fields.length - 1 &&
                                        fields.length < 10
                                      ) {
                                        append({ value: '' }, { shouldFocus: false });
                                      }

                                      if (e.target.value === '' && index !== fields.length - 1) {
                                        remove(index);
                                        setFocus(
                                          `multichoice.variants.${
                                            fields.length - 3 >= 0 ? fields.length - 3 : 0
                                          }.value`
                                        );
                                      }
                                    }}
                                  />
                                </>
                              )}
                            />
                          </div>
                        );
                      })}
                    </>
                  )}
                />
              </CardContent>
            </>
          )}
          <CourseSectionFooterEdit
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            deleteButton={
              <CourseSectionDelete sectionId={sectionData.id} pageId={sectionData.pageId} />
            }
            errorMessage={
              errors.root?.message ||
              errors.multichoice?.variants?.root?.message ||
              errors.multichoice?.question?.message ||
              errors.multichoice?.answer?.message ||
              errors.multichoice?.variants?.find?.((v) => v?.value?.message)?.value?.message ||
              errors.multichoice?.variants?.root?.message ||
              errors.multichoice?.variants?.message ||
              errors.maxAttempts?.message ||
              errors.maxScore?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
