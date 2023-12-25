import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  Input,
  cn,
  getNoun,
} from '@/shared';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import {
  ShortAnswerSectionResponseDto,
  useAnswerCourseShortAnswerSectionMutation,
} from '@/entities/CourseSection';

interface ShortAnswerSectionDisplayProps {
  sectionData: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSectionDisplay: FC<ShortAnswerSectionDisplayProps> = ({
  sectionData,
}) => {
  // Form setup
  const {
    reset,
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
    },
  } = useForm<answerSchemaType>({
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

  const [answerShortAnswerSection] =
    useAnswerCourseShortAnswerSectionMutation();
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
        <CardFooter className='justify-end gap-4'>
          {!isSubmitting && sectionData.maxAttempts > 0 && (
            <span
              className={cn(
                'text-[0.8125rem]',
                sectionData.maxAttempts &&
                  !sectionData.attempts &&
                  'text-destructive'
              )}
            >
              {sectionData.verdict === '' &&
                `${sectionData.maxAttempts} ${getNoun(
                  sectionData.maxAttempts,
                  'попытка',
                  'попытки',
                  'попыток'
                )}`}
              {sectionData.answer !== '' &&
                `Осталось ${sectionData.attempts} ${getNoun(
                  sectionData.attempts,
                  'попытка',
                  'попытки',
                  'попыток'
                )}`}
            </span>
          )}
          {!isSubmitting && sectionData.maxScore > 0 && (
            <span
              className={cn(
                'text-[0.8125rem]',
                sectionData.verdict === 'OK' && 'text-accent'
              )}
            >
              {sectionData.verdict === '' &&
                `${sectionData.maxScore} ${getNoun(
                  sectionData.maxScore,
                  'балл',
                  'балла',
                  'баллов'
                )}`}
              {sectionData.answer !== '' &&
                `${sectionData.score} / ${sectionData.maxScore} баллов`}
            </span>
          )}
          <Button
            type='button'
            variant='outline'
            onClick={() => reset({ shortanswer: { answer: '' } })}
          >
            <Icon type='reset' />
          </Button>
          <Button
            disabled={
              (!isValid && !isSubmitted) ||
              isSubmitting ||
              (sectionData.attempts <= 0 && !!sectionData.maxAttempts)
            }
            type='submit'
            className='w-64 justify-start'
            variant={!isValid && isSubmitted ? 'destructive' : 'default'}
          >
            <Icon type='send' className='text-inherit' />
            <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
              {(isSubmitting && 'Отправляем...') ||
                (!isValid &&
                  (errors.root?.message ||
                    errors.shortanswer?.answer?.message)) ||
                (isSubmitSuccessful && 'Верно!') ||
                'Отправить'}
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
