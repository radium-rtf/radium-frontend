'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, HTMLAttributes } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from './Icon';
import { cn } from '../utils/cn';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value: { id: string; value: string };
}

// Hover effect caused while being dragged. Need to fix it.
export const PermutationItem: FC<IProps> = ({ value, className, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: value.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 1 : undefined,
    position: isDragging ? 'relative' : undefined,
    backgroundColor: isDragging ? '#393E40' : undefined,
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
      className={cn(
        'flex items-center gap-4 rounded-lg border border-transparent px-6 py-2',
        '-outline-offset-1 outline-white transition-colors focus-visible:bg-white/5 focus-visible:outline',
        'hover:border-white/10 hover:bg-white/5',
        className
      )}
    >
      <Icon type='handle' className='text-primary-default' />
      <span className='font-mono text-[0.8125rem]'>{value.value}</span>
    </div>
  );
};
