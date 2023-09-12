'use client';
import React, { FC, MouseEventHandler } from 'react';
import { cn, Icon, IconType } from '@/shared';

interface IProps {
  icon: IconType;
  className?: string;
  disabled?: boolean;
  type: 'button' | 'reset' | 'submit';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton: FC<IProps> = ({
  icon,
  className,
  disabled,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        [
          'transition',
          'outline-white',
          'group rounded p-[0.5625rem]',
          'text-accent-primary-200',
          'disabled:cursor-not-allowed',
          'disabled:text-accent-primary-300',
          'hover:bg-grey-600',
          'active:bg-grey-800',
          'focus-visible:outline',
        ],
        className
      )}
    >
      <Icon
        type={icon}
        className='text-inherit
     '
      />
    </button>
  );
};
