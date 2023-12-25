'use client';
import {
  ChoiceSectionResponseDto,
  useUpdateCourseChoiceSectionMutation,
} from '@/entities/CourseSection';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  RadioGroup,
  RadioGroupItem,
  cn,
} from '@/shared';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';

interface ChoiceSectionEditProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSectionEdit: FC<ChoiceSectionEditProps> = ({
  sectionData,
}) => {
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
    control,
    register,
    setValue,
    setFocus,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isSubmitted },
  } = useForm<updateSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(updateSchema),
    defaultValues: {
      choice: {
        question: sectionData.content,
        variants: sectionData.variants
          .map((v) => ({
            value: v,
          }))
          .concat([{ value: '' }]),
      },
      maxAttempts: sectionData.maxAttempts,
      maxScore: sectionData.maxScore,
    },
  });

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
    body.choice.variants.pop();
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
              <RadioGroup defaultValue={sectionData.answer} className='gap-0'>
                {sectionData.variants.map((variant) => (
                  <div key={variant} className='flex items-center gap-4 py-2'>
                    <RadioGroupItem
                      value={variant}
                      id={`${sectionData.id}-${variant}`}
                    />
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
              <CardTitle className='text-base'>Вопрос</CardTitle>
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
                                    index === fields.length - 1
                                  ) {
                                    append(
                                      { value: '' },
                                      { shouldFocus: false }
                                    );
                                  }
                                  // remove if NOT last empty
                                  if (
                                    e.target.value === '' &&
                                    index !== fields.length - 1
                                  ) {
                                    remove(index);
                                    setFocus(
                                      `choice.variants.${
                                        fields.length - 3 >= 0
                                          ? fields.length - 3
                                          : 0
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
                className='shrink-0 text-inherit'
              />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                {(isSubmitting && 'Сохраняем...') ||
                  (!isValid &&
                    (errors.root?.message ||
                      errors.choice?.question?.message ||
                      errors.choice?.answer?.message ||
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
