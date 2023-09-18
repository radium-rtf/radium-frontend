'use client';

import { Button, Card, Icon, TextArea } from '@/shared';
import { FC, FormEventHandler, useRef } from 'react';
import { AnswerSectionResponseDto } from '..';

interface IProps {
  data: AnswerSectionResponseDto;
}

export const AnswerSection: FC<IProps> = ({ data }) => {
  const form = useRef<HTMLFormElement>(null);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log(
      (form.current?.elements.namedItem('answer') as HTMLInputElement).value
    );
  };

  return (
    <Card>
      <form
        className='flex flex-col gap-4'
        ref={form}
        onSubmit={onSubmitHandler}
      >
        <div className='flex items-center gap-4 text-accent-primary-200'>
          <Icon type='question' className='text-inherit' />
          <span className='font-bold text-inherit'>Вопрос</span>
        </div>
        <header className='text-sm leading-normal'>{data.content}</header>
        <main>
          <TextArea
            placeholder='Ответ'
            className='min-h-[8rem] w-full resize-y'
            name='answer'
          />
        </main>
        <footer className='flex items-center gap-4 place-self-end'>
          <span className='text-sm'>{data.maxScore} баллов</span>
          <Button type='reset'>Сбросить</Button>
          <Button type='submit' color='accent'>
            Ответить
          </Button>
        </footer>
      </form>
    </Card>
  );
};
