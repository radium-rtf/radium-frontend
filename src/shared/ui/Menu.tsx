'use client';
import { FC, ReactElement } from 'react';
import { IMenuItem } from './MenuItem';

interface IProps {
  children?: ReactElement<IMenuItem> | ReactElement<IMenuItem>[];
}

export const Menu: FC<IProps> = ({ children }) => {
  return (
    <ul className='rounded border border-grey-300 bg-grey-500 text-text-primary [&>li:first-child>button]:rounded-t [&>li:last-child>button]:rounded-b [&>li>button]:rounded-none'>
      {children}
    </ul>
  );
};
