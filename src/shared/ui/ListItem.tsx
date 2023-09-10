import React, { FC, MouseEventHandler } from 'react';
import { cn, Icon, IconType } from '@/shared';

export interface IListItem {
  icon: IconType;
  title?: string;
  subtitle?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

export const ListItem: FC<IListItem> = ({
  icon,
  title,
  subtitle,
  onClick,
  disabled,
  className,
}) => {
  return (
    <li>
      <button
        onClick={onClick}
        className={cn(
          [
            'group',
            'flex',
            'w-full',
            'items-center',
            'gap-4',
            'rounded-lg',
            'px-6',
            'py-2',
            'cursor-pointer',
            'transition-colors',
            'outline-white',
            '-outline-offset-1',
            'disabled:cursor-not-allowed',
            'hover:bg-grey-600',
            'hover:disabled:bg-transparent',
            'active:bg-grey-400',
            'focus-visible:outline',
          ],
          className
        )}
        type='button'
        disabled={disabled}
      >
        <Icon
          type={icon}
          className='flex-shrink-0 text-accent-primary-200 group-disabled:text-accent-primary-400'
        />
        <div className='flex-grow text-start'>
          {title && (
            <h1 className='text-[0.8125rem] text-text-primary group-disabled:text-grey-300'>
              {title}
            </h1>
          )}
          {subtitle && (
            <p className='text-[0.625rem] text-text-secondary group-disabled:text-grey-400'>
              {subtitle}
            </p>
          )}
        </div>
        <Icon
          type='chevron-right'
          className='flex-shrink-0 text-accent-primary-200 group-disabled:text-accent-primary-400'
        />
      </button>
    </li>
  );
};
