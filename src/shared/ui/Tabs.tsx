import React, { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

export const Tabs: FC<IProps> = ({ children }) => {
  return <ul className='flex items-end border-b border-white/10 px-6'>{children}</ul>;
};
