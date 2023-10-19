import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { cn } from '@/shared';
import Link from 'next/link';

export interface IListItem {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  href: string;
}

export const ListItem: FC<IListItem> = ({ className, children, href }) => {
  return (
    <li>
      <Link
        href={href}
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
      >
        {children}
      </Link>
    </li>
  );
};
