'use client';

import { MultiChoiceSectionResponseDto } from '@/entities/Section';
import { Button, Card, Checkbox, Icon, Input } from '@/shared';
import { FC } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { MarkdownEditor } from '@/shared/ui/MarkdownEditor';
import { CourseSectionDelete } from '@/features/CourseSectionDelete';
import { updateSchema, updateSchemaType } from '../lib/updateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateMultiChoiceSectionMutation } from '../api/multiChoiceSectionApi';

interface MultiChoiceSectionEditProps {
  sectionData: MultiChoiceSectionResponseDto;
  onSuccess: () => void;
}

export const MultiChoiceSectionEdit: FC<MultiChoiceSectionEditProps> = ({
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
      maxAttempts: 0,
      multichoice: {
        answer: sectionData.answers || [],
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
    name: 'multichoice.variants',
  });

  const [updateMultiChoiceSection] = useUpdateMultiChoiceSectionMutation();

  const onSubmitHandler: SubmitHandler<updateSchemaType> = (data) => {
    // console.log(data);

    // return;
    const body = {
      ...data,
      multichoice: {
        ...data.multichoice,
        variants: data.multichoice.variants.map((o) => o.value),
      },
    };
    body.multichoice.variants.pop();
    updateMultiChoiceSection({ sectionId: sectionData.id, ...body })
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
              name='multichoice.question'
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
                    {/* <Controller
                      name='multichoice.answer'
                      control={control}
                      render={({ field: props }) => (
                        <Checkbox
                          {...props}
                          disabled={index === fields.length - 1}
                          checked={)}
                        />
                      )}
                    /> */}
                    <Checkbox
                      {...register('multichoice.answer')}
                      value={watch(`multichoice.variants.${index}.value`)}
                    />
                    <Input
                      {...register(`multichoice.variants.${index}.value`, {
                        onChange: (e) => {
                          // Change answer if input checked
                          (
                            e.target.parentElement.parentElement.querySelector(
                              `input[type="checkbox"]`
                            ) as HTMLInputElement
                          ).checked &&
                            setValue(
                              `multichoice.answer.${index}`,
                              e.target.value
                            );
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
                              `multichoice.variants.${
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
              className='w-64'
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
          {errors.multichoice?.variants && (
            <p>{errors.multichoice.variants.message}</p>
          )}
        </form>
      </Card>
      <DevTool control={control} />
    </>
  );
};
