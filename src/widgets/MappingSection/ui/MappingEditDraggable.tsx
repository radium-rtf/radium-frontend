'use client';
import { Icon, Input, cn } from '@/shared';
import { CSSProperties, InputHTMLAttributes, forwardRef } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react';

interface MappingDraggableProps extends InputHTMLAttributes<HTMLInputElement> {
  data: { id: string; value: string };
}

export const MappingEditDraggable: FC<MappingDraggableProps> = forwardRef<
  HTMLInputElement,
  MappingDraggableProps
>(({ data, disabled, ...props }, ref) => {
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: data.id,
    animateLayoutChanges: () => false,
    disabled: disabled,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  } as CSSProperties;

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      className={cn(
        'flex flex-grow items-center gap-4 rounded-lg',
        isDragging && 'relative z-10 bg-[#393E40] opacity-100'
      )}
    >
      <button
        type='button'
        {...listeners}
        className={cn(disabled && 'cursor-not-allowed')}
      >
        <Icon type='handle' />
      </button>
      <Input className='flex-grow' ref={ref} {...props} />
    </div>
  );
});

MappingEditDraggable.displayName = 'MappingEditDraggable';
