import { Icon, Input } from '@/shared';
import React, { ChangeEventHandler, forwardRef } from 'react';

interface IProps {
  iconType?: Icon;
  placeHolder?: string;
  className?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  children?: React.ReactNode;
}

export const AnswerSectionInput = forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      value,
      onChange,
      children,
      placeHolder,
      iconType,
      ...props
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        {...props}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        inputClassName='text-text-secondary font-[0.8125rem] placeholder-opacity-100'
        iconType={iconType}
        iconClassName='text-inherit'
        className={className}
      >
        <span className='flex w-full max-w-[62px] text-[0.625rem]'>
          {children}
        </span>
      </Input>
    );
  }
);

AnswerSectionInput.displayName = 'AnswerSectionInput';
