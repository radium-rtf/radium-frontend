'use client';
import { FC, ReactElement } from 'react';
import { IMenuItem } from './MenuItem';
import { cn } from '@/shared';

interface IProps {
  children?: ReactElement<IMenuItem> | ReactElement<IMenuItem>[];
  className?: string;
}

export const Menu: FC<IProps> = ({ children, className }) => {
  return (
    <ul
      className={cn(
        [
          'rounded',
          'border',
          'border-grey-300',
          'bg-grey-500',
          'text-text-primary',
          '[&>li:first-child>button]:rounded-t',
          '[&>li:last-child>button]:rounded-b',
          '[&>li>button]:rounded-none',
        ],
        className
      )}
    >
      {children}
    </ul>
  );
};
