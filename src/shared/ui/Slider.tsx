'use client';
import React, { FC, ReactNode, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { IconButton } from '@/shared';

interface IProps {
  className?: string;
  children: ReactNode;
}

export const Slider: FC<IProps> = ({ className, children }) => {
  const [buttonsIsVisible, setbuttonsIsVisible] = useState({ left: false, right: true });
  const sliderRef = useRef<HTMLDivElement>(null);
  const sliderScroll = (scrollOffset: number) => {
    const slider = sliderRef.current;
    if (slider) {
      if ((slider.scrollLeft += scrollOffset) < 450) {
        setbuttonsIsVisible((prev) => {
          return { ...prev, left: false };
        });
      } else {
        setbuttonsIsVisible((prev) => {
          return { ...prev, left: true };
        });
      }
      slider.scrollLeft += scrollOffset;
    }
  };

  return (
    <section className={cn('relative', className)}>
      <IconButton
        className={cn(
          'absolute left-0 top-1/2 z-10 -translate-y-1/2 border-whiteMedium bg-backgroundOverlay hover:bg-backgroundOverlay',
          !buttonsIsVisible.left && 'hidden'
        )}
        onClick={() => sliderScroll(-400)}
      >
        <Icon type='arrow-left' />
      </IconButton>
      {/* <Button
        variant='outline'
        className={cn(
          'absolute left-0 top-1/2 z-10 -translate-y-1/2',
          !buttonsIsVisible.left && 'hidden'
        )}
        onClick={() => sliderScroll(-400)}
      >
        <Icon type='arrow-left' />
      </Button> */}
      <IconButton
        className={cn(
          'absolute right-0 top-1/2 z-10 -translate-y-1/2 border-whiteMedium bg-backgroundOverlay hover:bg-backgroundOverlay',
          !buttonsIsVisible.right && 'hidden'
        )}
        onClick={() => sliderScroll(400)}
      >
        <Icon type='arrow-right' />
      </IconButton>
      {/* <Button
        variant='outline'
        className={cn(
          'absolute right-0 top-1/2 z-10 -translate-y-1/2',
          !buttonsIsVisible.right && 'hidden'
        )}
        onClick={() => sliderScroll(400)}
      >
        <Icon type='arrow-right' />
      </Button> */}
      <div
        ref={sliderRef}
        className='flex snap-x snap-mandatory justify-start gap-8 overflow-x-scroll scroll-smooth [&::-webkit-scrollbar]:hidden'
      >
        {children}
      </div>
    </section>
  );
};
Slider.displayName = 'Slider';
