import React, { ButtonHTMLAttributes, FC } from 'react';
import { Icon } from './Icon';
import { cn } from '../utils/cn';

export interface IMenuItem extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

export const MenuItem: FC<IMenuItem> = ({
  className,
  children,
  icon,
  ...props
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
            'px-6',
            'py-2',
            'border',
            'border-transparent',
            'rounded-lg',
            '-outline-offset-1',
            'outline-white',
            'transition-colors',
            'hover:border-white/10',
            'hover:bg-white/5',
            'active:bg-black/5',
            'focus-visible:outline',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
          ],
          className
        )}
        {...props}
      >
        <Icon
          type={icon}
          className='flex-shrink-0 text-accent-primary-200 transition-colors group-disabled:text-accent-primary-400'
        />
        <span className='flex-grow whitespace-nowrap text-start text-sm transition-colors group-disabled:text-grey-200'>
          {children}
        </span>
        <Icon
          type='chevron-right'
          className='h-3 flex-shrink-0 text-accent-primary-200 transition-colors group-disabled:text-accent-primary-400'
        />
      </button>
    </li>
  );
};
