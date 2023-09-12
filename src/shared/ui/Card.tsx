import React, { FC, ReactNode } from 'react';
import { cn } from '@/shared';

interface IProps {
  children?: ReactNode;
  className?: string;
}

export const Card: FC<IProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        'rounded border border-grey-400 bg-grey-600 p-6',
        className
      )}
    >
      {children}
    </section>
  );
};
