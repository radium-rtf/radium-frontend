import { Icon, Input } from '@/shared';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  iconType?: Icon;
}

export const PasswordInput = forwardRef<HTMLInputElement, IProps>(({ iconType, ...props }, ref) => {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <Input
      icon={iconType}
      type={isHidden ? 'text' : 'password'}
      ref={ref}
      {...props}
      actionIcon={isHidden ? 'visible' : 'invisible'}
      onActionClick={() => setIsHidden((prev) => !prev)}
    />
  );
});

PasswordInput.displayName = 'InputWithHideButton';
