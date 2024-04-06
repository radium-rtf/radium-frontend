import React, { ButtonHTMLAttributes, FC } from 'react';
import { Icon } from '../Icon';
import { cn } from '../../utils/cn';
import './index.css';

export interface ITab extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
  isSelected?: boolean;
  variant?: 'basic' | 'outlined' | 'outlined-backgrounded';
}

export const Tab: FC<ITab> = ({ icon, children, isSelected, variant }) => {
  return (
    <button
      type='button'
      className={cn(
        'tab',
        isSelected && 'tab-selected',
        variant === 'outlined' && 'tab-outlined',
        variant === 'outlined-backgrounded' && 'tab-outlined-backgrounded'
      )}
    >
      <Icon type={icon} className={cn([isSelected && 'tab-selected'])} />
      <span className={cn('text-base text-text-primary', isSelected && 'tab-selected')}>
        {children}
      </span>
    </button>
  );
};
