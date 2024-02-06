'use client';

import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, Checkbox } from '@/shared';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  CourseSectionFooter,
  CourseSectionHeader,
  MultiChoiceSectionResponseDto,
  useAnswerCourseMultiChoiceSectionMutation,
} from '@/entities/CourseSection';

interface MultiChoiceSectionDisplayProps {
  sectionData: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSectionDisplay: FC<MultiChoiceSectionDisplayProps> = ({ sectionData }) => {
  // Form setup
  const form = useForm<answerSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    defaultValues: {
      multiChoice: {
        answer: sectionData.answers || [],
      },
    },
  });

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = form;

  const [answerMultiChoiceSection] = useAnswerCourseMultiChoiceSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerMultiChoiceSection({
      id: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('multiChoice.answer', { message: 'Неправильно!' });
      } else {
        setTimeout(() => reset(undefined, { keepValues: true }), 2000);
      }
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  return (
    <FormProvider {...form}>
      <Card>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CourseSectionHeader />
          <CardContent>
            <MarkdownDisplay markdown={sectionData.content} />
          </CardContent>
          <CardContent>
            {sectionData.variants.map((variant) => (
              <div key={variant} className='flex items-center gap-4 py-2'>
                <Controller
                  control={control}
                  name='multiChoice.answer'
                  render={({ field }) => (
                    <Checkbox
                      id={`${sectionData.id}-${variant}`}
                      checked={field.value?.includes(variant)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, variant])
                          : field.onChange(field.value?.filter((value) => value !== variant));
                      }}
                    />
                  )}
                />
                <label
                  htmlFor={`${sectionData.id}-${variant}`}
                  className='text-[0.8125rem] leading-normal'
                >
                  {variant}
                </label>
              </div>
            ))}
          </CardContent>
          <CourseSectionFooter<answerSchemaType>
            sectionData={sectionData}
            resetObject={{ multiChoice: { answer: [] } }}
            errorMessage={errors.root?.message || errors.multiChoice?.message}
          />
        </form>
      </Card>
    </FormProvider>
  );
};
