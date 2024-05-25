'use client';
import React, { FC, ReactNode, useRef, useState } from 'react';
import { cn } from '../utils/cn';
import { Icon } from './Icon';
import { Button } from '@/shared';

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
      <Button
        variant='outline'
        className={cn('absolute left-0 top-1/3 z-10', !buttonsIsVisible.left && 'hidden')}
        onClick={() => sliderScroll(-400)}
      >
        <Icon type='arrow-left' />
      </Button>
      <Button
        variant='outline'
        className={cn('absolute right-0 top-1/3 z-10', !buttonsIsVisible.right && 'hidden')}
        onClick={() => sliderScroll(400)}
      >
        <Icon type='arrow-right' />
      </Button>
      <div
        ref={sliderRef}
        className='container mx-auto flex  snap-x snap-mandatory overflow-x-hidden scroll-smooth'
      >
        {children}
      </div>
    </section>
  );
};
Slider.displayName = 'Slider';
