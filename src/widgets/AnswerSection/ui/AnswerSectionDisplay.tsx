'use client';

import { Card, CardContent, CardFooter, TextArea } from '@radium-ui-kit';
import { FC } from 'react';
import {
  AnswerSectionResponseDto,
  CourseSectionFooter,
  CourseSectionHeader,
  useAnswerCourseAnswerSectionMutation,
} from '@/entities/CourseSection';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
import { Comment } from '@/widgets/Comment';
import { zodResolver } from '@hookform/resolvers/zod';

type AnswerSectionDisplayProps = {
  sectionData: AnswerSectionResponseDto;
};

export const AnswerSectionDisplay: FC<AnswerSectionDisplayProps> = ({ sectionData }) => {
  const [answerAnswerSection] = useAnswerCourseAnswerSectionMutation();

  // Form init
  const form = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      answer: {
        answer: sectionData.answer,
      },
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = form;

  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerAnswerSection({
      id: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      setTimeout(() => reset(undefined, { keepValues: true, keepDirty: false }), 5000);
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };

  return (
    <FormProvider {...form}>
      <Card>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <CourseSectionHeader isTask />
          <CardContent>
            <MarkdownDisplay markdown={sectionData.content} />
          </CardContent>
          <CardContent>
            <TextArea className='w-full resize-y' {...register('answer.answer')} />
          </CardContent>
          <CourseSectionFooter
            resetObject={{
              answer: {
                answer: '',
              },
            }}
            isTask
            sectionData={sectionData}
            errorMessage={errors.answer?.message || errors.root?.message}
          />
          {sectionData.review && (
            <CardFooter>
              <Comment
                avatar={sectionData.review.reviewer.avatar}
                date={'12 сентября 2023, 14:00'}
                comment={sectionData.review.comment}
                name={sectionData.review.reviewer.name}
              />
            </CardFooter>
          )}
        </form>
      </Card>
    </FormProvider>
  );
};
