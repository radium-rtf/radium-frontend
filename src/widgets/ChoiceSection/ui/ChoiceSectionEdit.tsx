'use client';

import {
  ChoiceSectionResponseDto,
  useUpdateCourseChoiceSectionMutation,
} from '@/entities/CourseSection';
import { Button, Card, Icon, Input, Radio } from '@/shared';
import { FC } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../model/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface ChoiceSectionEditProps {
  sectionData: ChoiceSectionResponseDto;
  onSuccess: () => void;
}

export const ChoiceSectionEdit: FC<ChoiceSectionEditProps> = ({
  sectionData,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm<updateSchemaType>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      maxScore: sectionData.maxScore,
      maxAttempts: sectionData.maxAttempts,
      choice: {
        answer: '',
        question: sectionData.content,
        variants: sectionData.variants
          .map((v) => ({
            value: v,
          }))
          .concat([{ value: '' }]),
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'choice.variants',
  });

  const [updateChoiceSection] = useUpdateCourseChoiceSectionMutation();

  const onSubmitHandler: SubmitHandler<updateSchemaType> = (data) => {
    const body = {
      ...data,
      choice: {
        ...data.choice,
        variants: data.choice.variants.map((o) => o.value),
      },
    };
    body.choice.variants.pop();
    updateChoiceSection({ sectionId: sectionData.id, ...body })
      .unwrap()
      .then(onSuccess);
  };

  return (
    <>
      <Card asChild>
        <form
          className='flex flex-col gap-4'
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className='flex items-center gap-4 text-primary-default'>
            <Icon type='question' className='text-inherit' />
            <span className='font-mono font-bold leading-[normal] text-inherit'>
              Вопрос
            </span>
          </div>
          <header className='flex flex-col gap-4 text-[0.8125rem] leading-normal'>
            <Controller
              name='choice.question'
              control={control}
              render={({ field }) => (
                <MarkdownEditor
                  markdown={sectionData.content}
                  onChange={field.onChange}
                />
              )}
            />
          </header>
          <div className='flex items-center gap-4 text-primary-default'>
            <Icon type='question' className='text-inherit' />
            <span className='font-mono font-bold leading-[normal] text-inherit'>
              Ответ
            </span>
          </div>
          <main>
            <ul className='flex flex-col gap-4'>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    id={field.id}
                    className='flex items-center gap-4'
                  >
                    <Controller
                      name='choice.answer'
                      control={control}
                      render={({ field }) => (
                        <Radio
                          {...field}
                          disabled={index === fields.length - 1}
                          value={watch(`choice.variants.${index}.value`)}
                        />
                      )}
                    />
                    <Input
                      {...register(`choice.variants.${index}.value`, {
                        onChange: (e) => {
                          // Change answer if input checked
                          (
                            e.target.parentElement.parentElement.querySelector(
                              `input[type="radio"]`
                            ) as HTMLInputElement
                          ).checked &&
                            setValue('choice.answer', e.target.value);
                          // add if last input has text
                          if (
                            e.target.value !== '' &&
                            index === fields.length - 1
                          ) {
                            append({ value: '' }, { shouldFocus: false });
                          }
                          // remove if NOT last empty
                          if (
                            e.target.value === '' &&
                            index !== fields.length - 1
                          ) {
                            remove(index);
                            setFocus(
                              `choice.variants.${
                                fields.length - 3 >= 0 ? fields.length - 3 : 0
                              }.value`
                            );
                          }
                        },
                      })}
                    />
                  </div>
                );
              })}
            </ul>
          </main>
          <footer className='flex items-center gap-4 place-self-end'>
            <Input
              {...register('maxAttempts', { valueAsNumber: true })}
              placeholder='Максимум'
            >
              <span className='font-sans text-[0.625rem]'>попыток</span>
            </Input>
            <Input
              {...register('maxScore', { valueAsNumber: true })}
              placeholder='Максимум'
            >
              <span className='font-sans text-[0.625rem]'>баллов</span>
            </Input>
            <CourseSectionDelete
              sectionId={sectionData.id}
              pageId={sectionData.pageId}
            />
            <Button
              className='w-64 shrink-0'
              color='outlined'
              type='submit'
              disabled={!isValid}
            >
              <Icon type='save' className='text-inherit' />
              <span className='ml-[calc(50%-34px)] -translate-x-1/2'>
                Сохранить
              </span>
            </Button>
          </footer>
          {errors.choice?.variants && <p>{errors.choice.variants.message}</p>}
        </form>
      </Card>
    </>
  );
};
