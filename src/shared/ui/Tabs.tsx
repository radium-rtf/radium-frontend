import React, { FC, ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const Tabs: FC<IProps> = ({ children }) => {
  return <ul className='border-b px-6'>{children}</ul>;
};

export default Tabs;
