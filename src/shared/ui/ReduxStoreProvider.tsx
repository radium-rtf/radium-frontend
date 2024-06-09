'use client';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/shared/api/store';

interface IProps {
  children: ReactNode;
}

export const ReduxStoreProvider: FC<IProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
