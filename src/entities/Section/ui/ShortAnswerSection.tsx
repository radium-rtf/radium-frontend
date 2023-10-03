'use client';

import { Button, Card, Icon, Input, cn } from '@/shared';
import { FC, FormEventHandler, useState } from 'react';
import {
  ChoiceSectionResponseDto,
  ShortAnswerSectionResponseDto,
  useAnswerMutation,
} from '..';

interface IProps {
  data: ShortAnswerSectionResponseDto;
}

export const ShortAnswerSection: FC<IProps> = ({ data }) => {
  const [verdict, setVerdict] = useState<ChoiceSectionResponseDto['verdict']>(
    data.verdict
  );
  const [answer, { isLoading, isError }] = useAnswerMutation();
  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    answer({
      id: data.id,
      shortAnswer: {
        answer: formData.get('answer') as string,
      },
    })
      .unwrap()
      .then((result) => {
        result && setVerdict(result.verdict);
      });
  };

  return (
    <Card>
      <form className='flex flex-col gap-4' onSubmit={onSubmitHandler}>
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          {data.content}
        </header>
        <main>
          <Input type='text' placeholder='Ответ' name='answer' />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          <div className='flex flex-col gap-2 text-[0.8125rem]'>
            {verdict === 'OK' && (
              <span className='text-accent-secondary-300'>Верно!</span>
            )}
            {verdict === 'WA' && (
              <span className='text-accent-destructive-300'>Не правильно!</span>
            )}
          </div>
          {!isLoading && !isError && (
            <span
              className={cn(
                'text-[0.8125rem]',
                verdict === 'OK' && 'text-accent-secondary-300'
              )}
            >
              {verdict === 'OK' && `${data.maxScore} / ${data.maxScore}`}
              {verdict === 'WA' && `${0} / ${data.maxScore}`}
              {verdict === '' && `${data.maxScore}`}
              <span> баллов</span>
            </span>
          )}
          <Button type='reset'>Сбросить</Button>
          <Button disabled={isLoading} type='submit' color='accent'>
            Ответить
          </Button>
        </footer>
      </form>
    </Card>
  );
};
