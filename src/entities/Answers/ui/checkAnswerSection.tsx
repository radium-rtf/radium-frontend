'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import { Button, cn, Icon, Input } from '@/shared';
import { StudentAnswerDto } from '@/entities/Answers/model/answersDto';
import { Inter } from 'next/font/google';
import { AnswerSectionInput } from '@/entities/Answers/ui/answerSectionInput';
import { useReviewMutation } from '@/entities/Answers/api/reviewApi';
import { round } from '@floating-ui/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
});

interface IProps {
  studentAnswer: StudentAnswerDto;
  reviewed?: boolean;
  className?: string;
}

export const CheckAnswerSection: FC<IProps> = ({
  studentAnswer: answer,
  reviewed,
  className,
}) => {
  const pathname = usePathname();
  const sentDate = new Date(answer.createdAt);
  const [score, setScore] = useState(
    reviewed && answer.review
      ? round(answer.review.score * answer.section.maxScore)
      : undefined
  );
  const [comment, setComment] = useState(
    reviewed && answer.review ? answer.review.comment : ''
  );
  const [review, { isLoading, isError }] = useReviewMutation();

  const handleReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!score && score !== 0) {
      return;
    }

    review({
      answerId: answer.id,
      comment: comment,
      score: score,
    }).unwrap();
  };

  const handleScoreChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setScore(undefined);
      return;
    }

    const score = Number(e.target.value);

    if (isNaN(score)) {
      return;
    } else if (score <= 0) {
      setScore(0);
    } else if (score >= answer.section.maxScore) {
      setScore(answer.section.maxScore);
    } else {
      setScore(score);
    }
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'flex',
          'm-auto',
          'rounded-[1rem]',
          'bg-background-card',
          className
        )}
      >
        <main className='inline-block h-full w-full p-[1.5rem]'>
          <div className='mb-[1rem] w-full'>
            <div
              className='flex
                      gap-[1rem]
                      font-mono text-[1rem]
                      font-bold text-accent-primary-200'
            >
              <Icon type={'task'} />
              Задание
            </div>
            <p className='font-sans text-[0.625rem] leading-[normal] text-foreground-secondary'>
              отправлено {sentDate.getDay()}{' '}
              {monthDictionary[sentDate.getMonth()]} {sentDate.getFullYear()} в{' '}
              {sentDate.getHours()}:{sentDate.getMinutes()}
            </p>
          </div>

          <div className='mb-[1rem]'>
            <p
              className={cn(
                inter.variable,
                'text-[0.8125rem] leading-tight text-text-primary'
              )}
            >
              {answer.section.content}
            </p>
          </div>
          <div
            className={cn(
              'p-4',
              'min-h-[8rem]',
              'max-h-96',
              'overflow-y-auto',
              'radium-scrollbar',
              'break-words',
              inter.variable,
              'outline-none',
              'bg-transparent',
              'text-text-primary',
              'transition-colors',
              'text-[0.8125rem]',
              'leading-normal',
              'rounded-lg',
              'border',
              'border-white/10',
              'mb-[1rem]'
            )}
          >
            {answer.answer}
          </div>
          <form>
            <AnswerSectionInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              iconType='comment'
              className='mb-[1rem] w-full'
              placeHolder='Комментарий'
            />

            <div className='flex items-center justify-end gap-4 text-text-secondary'>
              <Input
                placeholder='Оценка'
                onChange={handleScoreChange}
                value={score ?? ''}
                inputClassName='text-text-secondary font-[0.8125rem]'
                className='
                h-full max-h-[2.25rem]
                w-full max-w-[16rem]
                px-[1rem] py-[0.5625rem]'
              >
                <span className='flex w-full max-w-[62px] text-[0.625rem]'>
                  / {answer.section.maxScore} баллов
                </span>
              </Input>

              <Button
                color={!isError ? 'outlined' : 'destructive'}
                onClick={handleReview}
                className={cn(
                  'flex',
                  'w-full max-w-[16rem]',
                  'px-[1rem] py-[0.5625rem]',
                  'text-inherit',
                  isError && 'text-text-primary'
                )}
              >
                {!isLoading && (
                  <Icon
                    className='shrink-0 text-inherit'
                    type={reviewed ? 'update' : 'submit'}
                  />
                )}
                {isLoading && (
                  <Icon className='shrink-0 text-inherit' type='loading' />
                )}
                <span className='ml-[calc(50%-34px)] w-full -translate-x-1/2'>
                  {reviewed ? 'Сменить оценку' : 'Оценить'}
                </span>
              </Button>
            </div>
          </form>
        </main>
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
