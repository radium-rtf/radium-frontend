import { cn } from '@/shared';
import { FC, HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLHeadingElement> {
  name: string;
  isCurrentModule?: boolean;
}

export const NavigationModuleTitle: FC<IProps> = ({
  className,
  name,
  isCurrentModule = false,
  ...props
}) => {
  return (
    <h2
      className={cn(
        'px-6 py-4 text-xl font-bold leading-[normal] text-accent-primary-200',
        isCurrentModule && 'text-accent-secondary-300',
        className
      )}
      {...props}
    >
      {name}
    </h2>
  );
};
