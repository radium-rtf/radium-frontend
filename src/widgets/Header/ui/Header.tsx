import React, { FC, ReactNode } from 'react';
import { HeaderProfile } from '@/features/HeaderProfile';

interface IProps {
  children?: ReactNode;
}

export const Header: FC<IProps> = ({ children }) => {
  return (
    <header
      className='
        sticky
        top-0
        flex
        items-center
        justify-between
        bg-bg-page
        px-12
        pb-9
        pt-12
        '
    >
      {children}
      <HeaderProfile />
    </header>
  );
};
