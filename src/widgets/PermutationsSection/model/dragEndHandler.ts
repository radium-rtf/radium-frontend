import { DragEndEvent } from '@dnd-kit/core';
import { UseFieldArrayMove } from 'react-hook-form';

export const dragEndHandler = (
  e: DragEndEvent,
  answers: { id: string; value: string }[],
  setValue: UseFieldArrayMove
) => {
  const { active, over } = e;
  const oldIndex = answers.findIndex((answer) => answer.id === active.id);
  const newIndex = answers.findIndex((answer) => answer.id === over?.id);

  setValue(oldIndex, newIndex);
};
