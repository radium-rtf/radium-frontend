'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, InputHTMLAttributes, forwardRef } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icon, Input, cn } from '@/shared';

interface PermutationsEditItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: { id: string; value: string };
}

// Hover effect caused while being dragged. Need to fix it.
export const PermutationsEditItem: FC<PermutationsEditItemProps> = forwardRef<
  HTMLInputElement,
  PermutationsEditItemProps
>(({ value, disabled, className, ...props }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: value.id,
    disabled: disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : undefined,
    position: isDragging ? 'relative' : undefined,
    backgroundColor: isDragging ? '#393E40' : undefined,
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        'flex h-9 gap-4 rounded-lg border border-transparent px-6 transition-colors hover:border-white/10 hover:bg-white/5',
        className
      )}
    >
      <button
        type='button'
        {...listeners}
        className={cn(
          'flex aspect-square h-full items-center justify-center',
          disabled && 'cursor-not-allowed'
        )}
      >
        <Icon type='handle' className='text-primary-default ' />
      </button>
      <Input type='text' {...props} ref={ref} className='flex-grow' />
    </div>
  );
});

PermutationsEditItem.displayName = 'PermutationsEditItem';
