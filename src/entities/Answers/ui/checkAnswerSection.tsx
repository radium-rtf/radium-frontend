'use client';

import React, { ChangeEvent, FC, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  Icon,
  Input,
  TextArea,
} from '@/shared';
import { StudentAnswerDto } from '@/entities/Answers/model/answersDto';
import { useReviewMutation } from '@/entities/Answers/api/reviewApi';
import { round } from '@floating-ui/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface IProps {
  studentAnswer: StudentAnswerDto;
  reviewed?: boolean;
}

export const CheckAnswerSection: FC<IProps> = ({ studentAnswer: answer, reviewed }) => {
  const pathname = usePathname();
  const sentDate = new Date(answer.createdAt);
  const [score, setScore] = useState(
    reviewed && answer.review ? round(answer.review.score * answer.section.maxScore) : undefined
  );
  const [comment, setComment] = useState(reviewed && answer.review ? answer.review.comment : '');
  const [review, { isLoading }] = useReviewMutation();

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
      >
        <Card>
          <CardHeader>
            <div className='flex items-center gap-4'>
              <Icon type='task' className='text-primary' />
              <span className='font-NTSomic text-base font-medium leading-[normal] text-primary'>
                Задание
              </span>
            </div>
            <p className='text-[0.625rem] leading-[normal] text-[#B3B3B3]'>
              отправлено {sentDate.getDay()} {monthDictionary[sentDate.getMonth()]}{' '}
              {sentDate.getFullYear()} в {sentDate.getHours()}:{sentDate.getMinutes()}
            </p>
          </CardHeader>
          <CardContent>
            <CardDescription>{answer.section.content}</CardDescription>
          </CardContent>
          <CardContent>
            <TextArea className='w-full resize-y' defaultValue={answer.answer} readOnly></TextArea>
          </CardContent>
          <CardContent>
            <Input
              icon='comment'
              placeholder='Комментарий'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </CardContent>
          <CardFooter className='flex justify-end gap-4'>
            <Input
              wrapperClassName='w-64'
              placeholder='Оценка'
              value={score ?? ''}
              onChange={handleScoreChange}
              text={`/ ${answer.section.maxScore} баллов`}
            />
            <Button
              onClick={handleReview}
              variant='outline'
              className='w-64 shrink-0 justify-start'
            >
              <Icon type={isLoading ? 'loading' : reviewed ? 'update' : 'submit'} />
              <span className='ml-[calc(50%-18px)] -translate-x-1/2'>Оценить</span>
            </Button>
          </CardFooter>
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
