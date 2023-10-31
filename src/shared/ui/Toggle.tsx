import React, { FC } from 'react';

interface IProps {
  disabled?: boolean;
  name: string;
}

export const Toggle: FC<IProps> = ({ disabled, name }) => {
  return (
    <label
      className='
      relative
      flex h-[1.125rem] w-8 cursor-pointer items-center rounded-full
      border border-grey-100 p-[0.1875rem] text-sm outline-white
      transition-all
      hover:bg-grey-500
      hover:p-0.5
      [&:has(:active):has(:disabled)]:p-[0.1875rem]
      [&:has(:active)]:p-1
      [&:has(:checked):has(:active)]:p-[0.1875rem]
      [&:has(:checked):has(:disabled)]:border-accent-primary-400
      [&:has(:checked)]:border-accent-primary-200
      [&:has(:disabled)]:cursor-not-allowed
      [&:has(:disabled)]:border-grey-300
      [&:has(:focus-visible)]:outline
      [&:hover:has(:checked)]:p-[0.0625rem]
      [&:hover:has(:disabled)]:bg-transparent
      [&:hover:has(:disabled)]:p-[0.1875rem]
     '
    >
      <input
        disabled={disabled}
        type='checkbox'
        className='peer appearance-none'
        name={name}
      />
      <div
        className='aspect-square h-full rounded-full
        bg-grey-100 transition-all peer-checked:ml-[0.875rem]
        peer-checked:bg-accent-primary-200
        peer-disabled:bg-grey-300
        peer-checked:peer-disabled:bg-accent-primary-400'
      />
    </label>
  );
};
