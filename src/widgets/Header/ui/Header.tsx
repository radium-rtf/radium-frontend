import React, { FC, ReactNode } from 'react';
import { HeaderProfileClient } from '@/features/HeaderProfile/ui/HeaderProfileClient';
import { HeaderProfile } from '@/features/HeaderProfile';

interface IProps {
  children?: ReactNode;
  isClient?: boolean;
}

export const Header: FC<IProps> = ({ children, isClient }) => {
  return (
    <header
      className='
        sticky
        top-0
        z-10
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
      {isClient ? <HeaderProfileClient /> : <HeaderProfile />}
    </header>
  );
};
