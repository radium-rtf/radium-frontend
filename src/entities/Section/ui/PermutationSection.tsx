'use client';
import { Button, Card, Icon, PermutationItem, cn } from '@/shared';
import { FC, FormEventHandler, useState } from 'react';
import { PermutationSectionResponseDto } from '../model/PermutationSectionResponseDto';
import { useAnswerMutation } from '../api/sectionApi';
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  rectIntersection,
} from '@dnd-kit/core';
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

interface IProps {
  data: PermutationSectionResponseDto;
}

export const PermutationSection: FC<IProps> = ({ data }) => {
  const [verdict, setVerdict] = useState<
    PermutationSectionResponseDto['verdict']
  >(data.verdict);
  const [items, setItems] = useState<string[]>(data.variants);
  const [answer, { isLoading, isError }] = useAnswerMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dragEndHandler = (e: DragEndEvent) => {
    console.log(e);

    const { active, over } = e;
    setItems((answers) => {
      const oldIndex = answers.findIndex((answer) => answer === active.id);
      const newIndex = answers.findIndex((answer) => answer === over?.id);

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const sumbitHander: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    answer({
      id: data.id,
      permutation: {
        answer: items,
      },
    })
      .unwrap()
      .then((data) => {
        data && setVerdict(data.verdict);
      });
  };

  return (
    <Card asChild>
      <form
        className='flex flex-col gap-4'
        onSubmit={sumbitHander}
        onReset={() => setItems(data.variants)}
      >
        <div className='flex items-center gap-4 text-primary-default'>
          <Icon type='question' className='text-inherit' />
          <span className='font-mono font-bold leading-[normal] text-inherit'>
            Вопрос
          </span>
        </div>
        <header className='text-[0.8125rem] leading-normal'>
          {data.content}
        </header>
        <DndContext
          collisionDetection={rectIntersection}
          onDragEnd={dragEndHandler}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
          sensors={sensors}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <main className='-mx-6'>
              {items.map((variant) => (
                <PermutationItem key={variant} value={variant} />
              ))}
            </main>
          </SortableContext>
        </DndContext>
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
