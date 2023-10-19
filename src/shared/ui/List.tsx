import React, { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';

interface IProps {
  children?: ReactNode;
  className?: string;
}

export const List: FC<IProps> = ({ children, className }) => {
  return <ul className={cn(className)}>{children}</ul>;
};
