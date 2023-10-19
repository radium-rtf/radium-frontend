import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { Icon } from './Icon';
import { cn } from '../utils/cn';

export interface ITab {
  icon: Icon;
  children?: ReactNode;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Tab: FC<ITab> = ({ icon, children, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        [
          'relative',
          'flex',
          'items-center',
          'gap-4',
          'px-3',
          'py-2',
          'transition',
          'rounded-lg',
          '-outline-offset-[1px]',
          'after:block',
          'after:h-0.5',
          'after:bg-accent-primary-200',
          'after:content-[""]',
          'after:absolute',
          'after:-bottom-[2px]',
          'after:left-1/2',
          'after:-translate-x-1/2',
          'after:w-0',
          'after:transition-all',
          'after:rounded-full',
        ],
        isSelected && 'after:w-6/12'
      )}
    >
      <Icon
        type={icon}
        className={cn([isSelected && 'text-accent-primary-200'])}
      />
      <span
        className={cn(
          'text-sm text-text-primary',
          isSelected && 'text-accent-primary-200'
        )}
      >
        {children}
      </span>
    </button>
  );
};
