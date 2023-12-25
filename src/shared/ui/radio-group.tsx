'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '../utils/cn';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('grid gap-2', className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'group aspect-square h-[1.125rem] w-[1.125rem] rounded-full border border-white/40 text-primary ring-offset-background transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:border-primary active:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.RadioGroupIndicator
        forceMount
        className='flex items-center justify-center'
      >
        <div className='h-0 w-0 rounded-full bg-current transition-all group-active:h-2 group-active:w-2 group-data-[state=checked]:h-2.5 group-data-[state=checked]:w-2.5 group-hover:group-data-[state=checked]:h-3 group-hover:group-data-[state=checked]:w-3 group-active:group-data-[state=checked]:h-2 group-active:group-data-[state=checked]:w-2' />
      </RadioGroupPrimitive.RadioGroupIndicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
