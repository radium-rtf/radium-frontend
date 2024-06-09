'use client';
import { useSortable } from '@dnd-kit/sortable';
import { CSSProperties, FC, HTMLAttributes } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Icon } from '@radium-ui-kit/Icon';
import { cn } from '../../../shared/utils/cn';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  value: { id: string; value: string };
}

export const PermutationItem: FC<IProps> = ({ value, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isSorting } =
    useSortable({
      id: value.id,
    });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  } as CSSProperties;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      {...props}
      className={cn(
        'flex items-center gap-4 rounded-[0.5rem] border border-transparent px-6 py-2 transition-colors',
        isDragging && 'relative z-10 border-white/10 bg-[#393E40]',
        !isSorting && 'hover:border-white/10 hover:bg-[#363A3B]'
      )}
    >
      <Icon type='handle' className='text-primary' />
      <span className='font-NTSomic text-[0.8125rem] leading-tight'>{value.value}</span>
    </div>
  );
};
