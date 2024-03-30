import { Card, CardContent, CardHeader, CardTitle, Icon, Input } from '@/shared';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import {
  CourseSectionFooter,
  ShortAnswerSectionResponseDto,
  useAnswerCourseShortAnswerSectionMutation,
} from '@/entities/CourseSection';

interface ShortAnswerSectionDisplayProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSectionDisplay: FC<ShortAnswerSectionDisplayProps> = ({ sectionData }) => {
  // Form setup
  const form = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      shortanswer: {
        answer: sectionData.answer,
      },
    },
  });
  const {
    reset,
    register,
    setError,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = form;

  const [answerShortAnswerSection] = useAnswerCourseShortAnswerSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerShortAnswerSection({
      id: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('shortanswer.answer', { message: 'Неправильно!' });
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
          <CardHeader className='flex-row items-center gap-4 space-y-0'>
            <Icon type='question' className='shrink-0 text-primary' />
            <CardTitle className='text-base'>Вопрос</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownDisplay markdown={sectionData.content} />
          </CardContent>
          <CardContent>
            <Input
              placeholder='Ответ'
              {...register('shortanswer.answer', {
                onChange: () => errors.root && clearErrors('root'),
              })}
            />
          </CardContent>
          <CourseSectionFooter
            resetObject={{
              shortanswer: {
                answer: '',
              },
            }}
            onAnswer={({ Answer }) => Answer && setValue('shortanswer.answer', Answer)}
            sectionData={sectionData}
            isQuestion
          />
        </form>
      </Card>
    </FormProvider>
  );
};
