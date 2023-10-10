import { Icon, Input } from '@/shared';
import { InputHTMLAttributes, forwardRef, useState } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  iconType?: Icon;
}

export const PasswordInput = forwardRef<HTMLInputElement, IProps>(
  ({ iconType, ...props }, ref) => {
    const [isHidden, setIsHidden] = useState(false);

    return (
      <Input
        iconType={iconType}
        type={isHidden ? 'text' : 'password'}
        ref={ref}
        {...props}
      >
        <button type='button' onClick={() => setIsHidden((prev) => !prev)}>
          <Icon type={isHidden ? 'visible' : 'invisible'} />
        </button>
      </Input>
    );
  }
);

PasswordInput.displayName = 'InputWithHideButton';
