import { ChangeEventHandler, FC } from 'react';
import { cn } from '@/shared';

interface TextAreaProps {
  defaultValue?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
  placeholder?: string;
  name: string;
  value?: string;
}

export const TextArea: FC<TextAreaProps> = ({
  defaultValue,
  className,
  onChange,
  disabled,
  placeholder,
  name,
  value,
}) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      defaultValue={defaultValue}
      className={cn(
        [
          'p-4',
          'text-sm',
          'rounded',
          'border',
          'border-grey-500',
          'outline-none',
          '-outline-offset-1',
          'bg-transparent',
          'text-text-primary',
          'resize',
          'transition-colors',
          'max-w-full',
          'placeholder:text-grey-100',
          'disabled:border-grey-600',
          'disabled:placeholder:text-grey-300',
          'disabled:text-grey-300',
          'disabled:cursor-not-allowed',
          'disabled:hover:bg-transparent',
          'hover:bg-grey-600',
          'hover:placeholder:text-text-primary',
          'focus:bg-grey-800',
          'focus:border-accent-primary-200',
          'focus:placeholder:text-text-secondary',
        ],
        className
      )}
    />
  );
};
