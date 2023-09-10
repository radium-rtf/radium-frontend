'use client';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { cn, Icon, IconType } from '@/shared';

export interface IMenuItem {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
  icon: IconType;
  disabled?: boolean;
}

export const MenuItem: FC<IMenuItem> = ({
  onClick,
  className,
  children,
  disabled,
  icon,
}) => {
  return (
    <li>
      <button
        className={cn(
          [
            'group',
            'flex',
            'w-full',
            'cursor-pointer',
            'items-center',
            'gap-4',
            'rounded',
            'px-6',
            'py-2',
            '-outline-offset-1',
            'outline-white',
            'transition-colors',
            'hover:bg-grey-600',
            'focus-visible:bg-grey-600',
            'focus-visible:outline',
            'disabled:cursor-not-allowed',
          ],
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        <Icon
          type={icon}
          className='text-accent-primary-200 transition-colors group-disabled:text-accent-primary-400'
        />
        <span className='flex-grow text-start text-sm transition-colors group-disabled:text-grey-200'>
          {children}
        </span>
        <Icon
          type='chevron-right'
          className='h-3 text-accent-primary-200 transition-colors group-disabled:text-accent-primary-400'
        />
      </button>
    </li>
  );
};
