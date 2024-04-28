'use client';

import React, { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  DownloadFile,
  Icon,
  Input,
  TextArea,
} from '@/shared';
import { StudentAnswerDto } from '@/entities/Answers/model/answersDto';
import { useReviewMutation } from '@/entities/Answers/api/reviewApi';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { answerSchema, answerSchemaType } from '../model/answersSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface IProps {
  studentAnswer: StudentAnswerDto;
  reviewed?: boolean;
}

export const CheckAnswerSection: FC<IProps> = ({ studentAnswer: answer }) => {
  const [review] = useReviewMutation();

  // Form init
  const form = useForm<answerSchemaType>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      comment: '',
      score: 0,
    },
  });

  const {
    register,
    clearErrors,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful, isSubmitted, isDirty },
  } = form;

  const onSubmitHandler: SubmitHandler<answerSchemaType> = async (data) => {
    const response = await review({
      answerId: answer.id,
      ...data,
    });
    if ('data' in response) {
      setTimeout(() => reset(undefined, { keepValues: true, keepDirty: false }), 5000);
    } else {
      setError('root', { message: 'Ошибка!' });
    }
  };
  const pathname = usePathname();
  const sentDate = new Date(answer.createdAt);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Card>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <CardHeader>
              <div className='flex items-center gap-4'>
                <Icon type='task' className='text-primary' />
                <span className='font-NTSomic text-base font-medium leading-[normal] text-primary'>
                  Задание
                </span>
              </div>
              <p className='text-[0.625rem] leading-[normal] text-[#B3B3B3]'>
                отправлено {sentDate.getDate()} {monthDictionary[sentDate.getMonth()]}{' '}
                {sentDate.getFullYear()} в {sentDate.getHours()}:{sentDate.getMinutes()}
              </p>
            </CardHeader>
            <CardContent>
              <CardDescription>{answer.section.content}</CardDescription>
            </CardContent>
            <CardContent>
              {answer.section.type === 'file' && (
                <DownloadFile
                  name={answer.section.file?.name || ''}
                  sizeInKiB={answer.section.file?.sizeInKiB || 0}
                  href={answer.section.file?.location || ''}
                />
              )}
              {answer.section.type === 'answer' && (
                <TextArea
                  className='w-full resize-y'
                  defaultValue={answer.answer}
                  readOnly
                ></TextArea>
              )}
            </CardContent>
            <CardContent>
              <Input
                icon='comment'
                placeholder='Комментарий'
                {...register('comment', {
                  onChange: () => errors.root && clearErrors('root'),
                })}
              />
            </CardContent>
            <CardFooter className='flex justify-end gap-4'>
              <Input
                wrapperClassName='w-64'
                placeholder='Оценка'
                {...register('score', {
                  onChange: () => errors.root && clearErrors('root'),
                })}
                text={`/ ${answer.section.maxScore} баллов`}
              />
              <Button
                type='submit'
                disabled={!isValid || isSubmitting}
                variant={
                  (!isValid && isSubmitted && 'destructive') ||
                  (!isSubmitSuccessful && 'outline') ||
                  'default'
                }
                className='w-64 shrink-0 justify-start'
              >
                <Icon
                  type={
                    (isSubmitting && 'loading') ||
                    (isSubmitSuccessful && 'success') ||
                    ((errors.score?.message || errors.comment?.message || errors.root?.message) &&
                      'alert') ||
                    (answer.verdict === 'REVIEWED' && !isDirty && 'update') ||
                    'submit'
                  }
                  className='text-inherit'
                />
                <span className='ml-[calc(50%-18px)] -translate-x-1/2'>
                  {(isSubmitting && 'Оцениваем...') ||
                    (!isValid &&
                      (errors.score?.message || errors.comment?.message || errors.root?.message)) ||
                    (isSubmitSuccessful && 'Оценено!') ||
                    (answer.verdict === 'REVIEWED' && !isDirty && 'Сменить оценку') ||
                    'Оценить'}
                </span>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

const monthDictionary: { [mounth: string]: string } = {
  '0': 'Января',
  '1': 'Февраля',
  '2': 'Марта',
  '3': 'Апреля',
  '4': 'Мая',
  '5': 'Июня',
  '6': 'Июля',
  '7': 'Августа',
  '8': 'Сентября',
  '9': 'Октября',
  '10': 'Ноября',
  '11': 'Декабря',
};
