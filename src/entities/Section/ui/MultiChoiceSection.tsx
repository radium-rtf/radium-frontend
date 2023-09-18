'use client';

import { Button, Card, Checkbox, Icon } from '@/shared';
import { FC, FormEventHandler, useRef } from 'react';
import { MultiChoiceSectionResponseDto } from '..';

interface IProps {
  data: MultiChoiceSectionResponseDto;
}

export const MultiChoiceSection: FC<IProps> = ({ data }) => {
  const form = useRef<HTMLFormElement>(null);

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(form.current!);
    console.log(formData.getAll('answers'));
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
          <ul>
            {data.variants.map((variant) => (
              <li key={variant} className='py-2'>
                <Checkbox name='answers' value={variant}>
                  {variant}
                </Checkbox>
              </li>
            ))}
          </ul>
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
