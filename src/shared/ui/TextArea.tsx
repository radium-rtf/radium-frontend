import { cn } from '../utils/cn';
import { FC, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<TextAreaProps> = ({ className, ...props }) => {
  return (
    <textarea
      {...props}
      className={cn(
        [
          'p-4',
          'font-mono',
          'text-[0.8125rem]',
          'leading-normal',
          'rounded-lg',
          'border',
          'border-white/10',
          'outline-none',
          'bg-transparent',
          'text-text-primary',
          'resize',
          'transition-colors',
          'max-w-full',
          'placeholder:text-foreground-secondary',
          'disabled:opacity-50',
          '[&:not(:disabled)]:hover:bg-white/5',
          '[&:not(:disabled)]:focus:bg-black/10',
          '[&:not(:disabled)]:focus:border-primary-default',
        ],
        className
      )}
    />
  );
};
