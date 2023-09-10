'use client';
import { FC, ReactElement } from 'react';
import { IMenuItem } from './MenuItem';

interface IProps {
  children?: ReactElement<IMenuItem> | ReactElement<IMenuItem>[];
  onClose?: () => void;
}

export const Menu: FC<IProps> = ({ children, onClose }) => {
  return (
    <ul className='text-text-primary [&>li:first-child>button]:rounded-t [&>li:last-child>button]:rounded-b [&>li>button]:rounded-none'>
      {children}
    </ul>
  );
};
