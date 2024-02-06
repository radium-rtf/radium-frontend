'use client';
import { FC, MouseEventHandler } from 'react';
import { cn } from '../utils/cn';
import { Icon } from '../ui/Icon';

interface IProps {
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const CloseButton: FC<IProps> = ({ className, onClick }) => {
  return (
    <button onClick={onClick}>
      <Icon
        className={cn(className, 'hover:bg-text-primary h-6 w-6 p-1 hover:bg-opacity-10')}
        type={'remove'}
      />
    </button>
  );
};
