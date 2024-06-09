import { Card, CardContent, CardHeader, CardTitle, Icon, Input } from '@/shared';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@radium-ui-kit/MarkdownDisplay';
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
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    values: {
      shortanswer: {
        answer: sectionData.answer,
      },
    },
    defaultValues: {
      shortanswer: {
        answer: '',
      },
    },
  });

  const {
    reset,
    register,
    setError,
    clearErrors,
    handleSubmit,
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
          <CourseSectionFooter<answerSchemaType>
            sectionData={sectionData}
            resetObject={{ shortanswer: { answer: '' } }}
            errorMessage={errors.shortanswer?.answer?.message || errors.root?.message}
          />
        </form>
      </Card>
    </FormProvider>
  );
};
