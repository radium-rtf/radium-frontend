import React, { CSSProperties, FC } from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';

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
        <div className='flex h-0.5 w-full items-center bg-white/10'>
          <div
            className={cn('h-full bg-primary transition-all', {
              'bg-accent-secondary-300': theme === 'secondary',
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <span className='block w-[40px] text-[0.8125rem] text-foreground'>
            {percentage.toFixed()}&nbsp;%
          </span>
        )}
      </div>
    );

  return (
    <div
      className={cn('relative  text-primary', {
        'text-secondary': theme === 'secondary',
      })}
    >
      <svg
        className='aspect-square h-[1.125rem] -rotate-90'
        style={{ '--progress': 54 - 54 * (percentage / 100) } as CSSProperties}
      >
        <circle className='fill-none stroke-white/20 stroke-1' cx={9} cy={9} r={8.5}></circle>
        <circle
          className={cn(
            [
              'stroke-primary',
              'stroke-1',
              '[stroke-dasharray:54]',
              '[stroke-dashoffset:var(--progress)]',
              '[stroke-linecap:round]',
              'fill-none',
              'transition-all',
            ],
            theme === 'secondary' && 'stroke-secondary text-secondary'
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
