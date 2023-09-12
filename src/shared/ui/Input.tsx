import { ChangeEventHandler, FC, ReactNode } from 'react';
import { cn } from '@/shared';

interface TextInputProps {
  defaultValue?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
  className?: string;
}

export const TextInput: FC<TextInputProps> = ({
  defaultValue,
  disabled,
  onChange,
  children,
  className,
}: TextInputProps) => {
  return (
    <div className='flex w-64 justify-end text-sm text-text-secondary'>
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        className={cn(
          [
            'my-auto',
            'h-9',
            'w-64',
            'resize-none',
            'overflow-hidden',
            'rounded-lg',
            'border',
            'border-grey-300',
            'bg-green-300',
            'bg-transparent',
            'p-1',
            'text-start',
            'leading-tight',
            'disabled:cursor-not-allowed',
            'disabled:opacity-50',
            'hover:bg-white',
            'hover:bg-opacity-5',
            'active:bg-black',
            'active:outline-none',
            'active:focus-visible:bg-opacity-10',
            'focus-visible:outline-1',
            'focus-visible:outline-offset-0',
            'focus-visible:outline-white',
            'hover:focus-visible:bg-white',
            'focus-visible:bg-opacity-5',
          ],
          className
        )}
      ></input>
      <div className='fixed my-2 mr-2 flex gap-4 align-middle'>{children}</div>
    </div>
  );
};
