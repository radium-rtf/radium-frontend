import React, { FC, HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/shared';
import { Slot } from '@radix-ui/react-slot';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  asChild?: boolean;
}

export const Card: FC<IProps> = ({
  children,
  className,
  asChild,
  ...props
}) => {
  const Comp = asChild ? Slot : 'section';

  return (
    <Comp
      {...props}
      className={cn(
        'flex flex-col gap-4 rounded-2xl bg-grey-600 p-6',
        className
      )}
    >
      {children}
    </Comp>
  );
};
