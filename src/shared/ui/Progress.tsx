import React, { CSSProperties, FC } from 'react';
import { cn, Icon } from '@/shared';

interface IProps {
  type?: 'linear' | 'radial';
  className?: string;
  theme: 'primary' | 'secondary';
  percentage: number;
  showPercentage?: boolean;
}

export const Progress: FC<IProps> = ({
  type = 'linear',
  className,
  percentage,
  theme,
  showPercentage,
}) => {
  if (type === 'linear')
    return (
      <div className={cn('flex w-full items-center gap-4', className)}>
        <div className='flex h-0.5 w-full items-center bg-grey-400'>
          <div
            className={cn('h-full bg-accent-primary-200 transition', {
              'bg-accent-secondary-300': theme === 'secondary',
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <span className='text-sm text-text-primary'>
            {percentage.toFixed()}&nbsp;%
          </span>
        )}
      </div>
    );
  return (
    <div
      className={cn(
        'relative stroke-accent-primary-200 text-accent-primary-200',
        { 'text-accent-secondary-300': theme === 'secondary' }
      )}
    >
      <svg
        className='aspect-square h-[1.125rem] -rotate-90'
        style={{ '--progress': 54 - 54 * (percentage / 100) } as CSSProperties}
      >
        <circle
          className={cn(
            [
              'stroke-1',
              '[stroke-dasharray:54]',
              '[stroke-dashoffset:var(--progress)]',
              '[stroke-linecap:round]',
            ],
            theme === 'secondary' && [
              'text-accent-secondary-300',
              'stroke-accent-secondary-300',
            ]
          )}
          cx={9}
          cy={9}
          r={8.5}
        ></circle>
      </svg>
      <Icon
        type='submit'
        className={cn(
          [
            'absolute',
            'left-1/2',
            'top-1/2',
            'h-[0.5625rem]',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'opacity-0',
            'text-inherit',
            'transition',
          ],
          {
            'opacity-100': percentage >= 100,
          }
        )}
      />
    </div>
  );
};