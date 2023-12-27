'use client';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Icon,
  RadioGroup,
  RadioGroupItem,
  cn,
  getNoun,
} from '@/shared';
import { FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { MarkdownDisplay } from '@/shared/ui/MarkdownDisplay';
import { answerSchema, answerSchemaType } from '../model/answerSchema';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  ChoiceSectionResponseDto,
  useAnswerCourseChoiceSectionMutation,
} from '@/entities/CourseSection';

interface ChoiceSectionDisplayProps {
  sectionData: ChoiceSectionResponseDto;
}

export const ChoiceSectionDisplay: FC<ChoiceSectionDisplayProps> = ({ sectionData }) => {
  // Form setup
  const {
    reset,
    control,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<answerSchemaType>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(answerSchema),
    defaultValues: {
      choice: {
        answer: sectionData.answer,
      },
    },
  });

  const [answerChoiceSection] = useAnswerCourseChoiceSectionMutation();
  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await answerChoiceSection({
      id: sectionData.id,
      ...data,
    });
    if ('data' in response) {
      if (response.data.verdict === 'WA') {
        setError('choice.answer', { message: 'Неправильно!' });
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
          <Controller
            control={control}
            name='choice.answer'
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
        <CardFooter className='justify-end gap-4'>
          {!isSubmitting && sectionData.maxAttempts > 0 && (
            <span
              className={cn(
                'text-[0.8125rem]',
                sectionData.maxAttempts && !sectionData.attempts && 'text-destructive'
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
            <span className={cn('text-[0.8125rem]', sectionData.verdict === 'OK' && 'text-accent')}>
              {sectionData.verdict === '' &&
                `${sectionData.maxScore} ${getNoun(
                  sectionData.maxScore,
                  'балл',
                  'балла',
                  'баллов'
                )}`}
              {sectionData.answer !== '' && `${sectionData.score} / ${sectionData.maxScore} баллов`}
            </span>
          )}
          <Button type='button' variant='outline' onClick={() => reset({ choice: { answer: '' } })}>
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
                (!isValid && (errors.root?.message || errors.choice?.answer?.message)) ||
                (isSubmitSuccessful && 'Верно!') ||
                'Отправить'}
            </span>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
