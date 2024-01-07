'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, InputHTMLAttributes, forwardRef } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icon, Input, cn } from '@/shared';

interface PermutationsEditItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: { id: string; value: string };
  placeholder?: string;
}

// Hover effect caused while being dragged. Need to fix it.
export const PermutationsEditItem: FC<PermutationsEditItemProps> = forwardRef<
  HTMLInputElement,
  PermutationsEditItemProps
>(({ value, disabled, placeholder, ...props }, ref) => {
  const { listeners, setNodeRef, transform, transition, isDragging, isSorting } = useSortable({
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
      className={cn(
        'flex items-center gap-4 rounded-[0.5rem] border border-transparent px-6 transition-colors',
        isDragging && 'relative z-10 border-white/10 bg-[#393E40]',
        !isSorting && 'hover:border-white/10 hover:bg-[#363A3B]'
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
        <Icon type='handle' className='text-primary' />
      </button>
      <Input type='text' placeholder={placeholder} {...props} ref={ref} className='flex-grow' />
    </div>
  );
});

PermutationsEditItem.displayName = 'PermutationsEditItem';
