import { FC, ReactElement } from 'react';
import { IMenuItem } from './MenuItem';
import { cn } from '../utils/cn';

interface IProps {
  children?: ReactElement<IMenuItem> | ReactElement<IMenuItem>[];
  className?: string;
}

export const Menu: FC<IProps> = ({ children, className }) => {
  return (
    <ul
      className={cn('bg-bg-overlay overflow-hidden rounded-lg py-2', className)}
    >
      {children}
    </ul>
  );
};
