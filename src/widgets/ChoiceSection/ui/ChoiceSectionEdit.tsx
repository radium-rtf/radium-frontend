'use client';
import {
  ChoiceSectionResponseDto,
  CourseSectionFooterEdit,
  CourseSectionHeaderEdit,
  useUpdateCourseChoiceSectionMutation,
} from '@/entities/CourseSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  Card,
  CardContent,
  CardTitle,
  Icon,
  Input,
  RadioGroup,
  RadioGroupItem,
  cn,
} from '@/shared';
import { Controller, FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
import { MarkdownEditor } from '@radium-ui-kit/MarkdownEditor';
import { SECTION_MAX_ANSWERS_COUNT } from '@/entities/Course';

interface ChoiceSectionEditProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSectionEdit: FC<ChoiceSectionEditProps> = ({ sectionData }) => {
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
      choice: {
        question: sectionData.content,
        variants:
          sectionData.variants.length < SECTION_MAX_ANSWERS_COUNT
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
    setValue,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choice.variants',
  });

  const [updateChoiceSection] = useUpdateCourseChoiceSectionMutation();
  const onSubmitHandler: SubmitHandler<updateSchemaType> = async (data) => {
    const body = {
      ...data,
      choice: {
        ...data.choice,
        variants: data.choice.variants.map((o) => o.value),
      },
    };
    const response = await updateChoiceSection({
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
                <RadioGroup defaultValue={sectionData.answer} className='gap-0'>
                  {sectionData.variants.map((variant) => (
                    <div key={variant} className='flex items-center gap-4 py-2'>
                      <RadioGroupItem value={variant} id={`${sectionData.id}-${variant}`} />
                      <label
                        htmlFor={`${sectionData.id}-${variant}`}
                        className='text-[0.8125rem] leading-normal'
                      >
                        {variant}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </>
          )}
          {isEditing && (
            <>
              <CardContent className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name='choice.question'
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
                  name='choice.answer'
                  render={({ field }) => (
                    <RadioGroup
                      className='gap-4'
                      onValueChange={(e) => {
                        field.onChange(e);
                        // Reset root error
                        errors.root && clearErrors('root');
                      }}
                      value={field.value}
                    >
                      {fields.map((field, index) => {
                        return (
                          <Controller
                            key={field.id}
                            control={control}
                            name={`choice.variants.${index}.value`}
                            render={({ field: { onChange, ...field } }) => (
                              <div className='flex items-center gap-4'>
                                <RadioGroupItem
                                  value={field.value}
                                  disabled={index === fields.length - 1}
                                />
                                <Input
                                  {...field}
                                  placeholder={`Вариант ${index + 1}`}
                                  onChange={(e) => {
                                    onChange(e);
                                    // Reset root error
                                    errors.root && clearErrors('root');
                                    // Change answer if input checked
                                    (
                                      e.target.parentElement!.parentElement!.querySelector(
                                        `[role="radio"]`
                                      ) as HTMLButtonElement
                                    ).dataset.state === 'checked' &&
                                      setValue('choice.answer', e.target.value);
                                    // add if last input has text
                                    if (
                                      e.target.value !== '' &&
                                      index === fields.length - 1 &&
                                      fields.length < SECTION_MAX_ANSWERS_COUNT
                                    ) {
                                      append({ value: '' }, { shouldFocus: false });
                                    }
                                    // remove if NOT last empty
                                    if (e.target.value === '' && index !== fields.length - 1) {
                                      remove(index);
                                      setFocus(
                                        `choice.variants.${
                                          fields.length - 3 >= 0 ? fields.length - 3 : 0
                                        }.value`
                                      );
                                    }
                                  }}
                                />
                              </div>
                            )}
                          />
                        );
                      })}
                    </RadioGroup>
                  )}
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
              errors.choice?.question?.message ||
              errors.choice?.answer?.message ||
              errors.choice?.variants?.find?.((v) => v?.value?.message)?.value?.message ||
              errors.choice?.variants?.root?.message ||
              errors.choice?.variants?.message ||
              errors.maxAttempts?.message ||
              errors.maxScore?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
