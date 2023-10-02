import React, { FC, ReactElement } from 'react';
import { IListItem } from '@/shared/ui/ListItem';
import { cn } from '@/shared';

interface IProps {
  children?: ReactElement<IListItem> | ReactElement<IListItem>[];
  className?: string;
}

export const List: FC<IProps> = ({ children, className }) => {
  return <ul className={cn(className)}>{children}</ul>;
};
