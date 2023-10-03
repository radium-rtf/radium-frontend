import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card: FC<IProps> = ({ children, className, ...props }) => {
  return (
    <section
      {...props}
      className={cn(
        'bg-grey-600 flex flex-col gap-4 rounded-2xl p-6',
        className
      )}
    >
      {children}
    </section>
  );
};
