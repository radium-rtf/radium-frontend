'use client';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { Card, CardContent, RadioGroup, RadioGroupItem } from '@/shared';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  CourseSectionFooter,
  CourseSectionHeader,
  ChoiceSectionResponseDto,
  useAnswerCourseChoiceSectionMutation,
} from '@/entities/CourseSection';

interface ChoiceSectionDisplayProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSectionDisplay: FC<ChoiceSectionDisplayProps> = ({ sectionData }) => {
  // Form setup
  const form = useForm<answerSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    defaultValues: {
      choice: {
        answer: sectionData.answer,
      },
    },
  });

  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = form;

  const [answerChoiceSection] = useAnswerCourseChoiceSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerChoiceSection({
      id: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('choice.answer', { message: 'Неправильно!' });
      }
      setTimeout(() => reset(undefined, { keepValues: true }), 5000);
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
            <Controller
              control={control}
              name='choice.answer'
              defaultValue=''
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  onValueChange={(value) => {
                    onChange(value);
                    clearErrors('root');
                  }}
                  value={value}
                  className='gap-0'
                >
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
              )}
            />
          </CardContent>
          <CourseSectionFooter<answerSchemaType>
            sectionData={sectionData}
            resetObject={{ choice: { answer: '' } }}
            errorMessage={
              errors.choice?.message || errors.choice?.answer?.message || errors.root?.message
            }
          />
        </form>
      </Card>
    </FormProvider>
  );
};
