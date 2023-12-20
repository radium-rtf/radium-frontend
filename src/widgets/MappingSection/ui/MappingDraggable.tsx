'use client';
import { Icon, cn } from '@/shared';
import { CSSProperties } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';

interface MappingDraggableProps {
  data: { id: string; value: string };
}

export const MappingDraggable: FC<MappingDraggableProps> = ({ data }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: data.id, animateLayoutChanges: () => false });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as CSSProperties;

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        'flex flex-grow items-center gap-4 rounded-lg border border-white/5 px-4 py-2',
        isDragging && 'relative z-10 bg-[#393E40] opacity-100'
      )}
    >
      <button type='button'>
        <Icon type='handle' />
      </button>
      <span className='text-[0.8125rem] leading-normal text-foreground-default'>
        {data.value}
      </span>
    </div>
  );
};
