import React, { FC, ReactElement } from 'react';
import { IListItem } from '@/shared/ui/ListItem';
import { cn } from '@/shared';

interface IProps {
  children?: ReactElement<IListItem> | ReactElement<IListItem>[];
  className?: string;
}

export const List: FC<IProps> = ({ children }) => {
  return (
    <ul
      className={cn([
        '[&>li:first-child>button]:rounded-t',
        '[&>li:last-child>button]:rounded-b',
        '[&>li>button]:rounded-none',
      ])}
    >
      {children}
    </ul>
  );
};
