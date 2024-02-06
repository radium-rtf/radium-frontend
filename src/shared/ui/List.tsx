import React, {
  forwardRef,
  ForwardRefExoticComponent,
  LiHTMLAttributes,
  ReactNode,
  RefAttributes,
  SVGAttributes,
} from 'react';
import { cn } from '../utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { Icon } from './Icon';

// List
interface IListProps extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

export const List = forwardRef<HTMLUListElement, IListProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return <Comp ref={ref} {...props} className={cn('flex flex-col', className)} />;
  }
);
List.displayName = 'List';

// List Item
interface IListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

export const ListItem = forwardRef<HTMLLIElement, IListItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'li';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('flex items-center gap-4 px-6 py-2', className)}
      ></Comp>
    );
  }
);
ListItem.displayName = 'ListItem';

// List Icon

interface IListIconProps extends SVGAttributes<SVGSVGElement> {
  asChild?: boolean;
  icon?: Icon;
}
export const ListIcon = forwardRef<SVGSVGElement, IListIconProps>(
  ({ asChild, icon, className, ...props }, ref) => {
    const Comp = asChild
      ? (Slot as ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement> & { children?: ReactNode }
        >)
      : Icon;
    return (
      <Comp
        {...props}
        type={icon || 'null'}
        ref={ref}
        className={cn('text-foreground-default shrink-0', className)}
      />
    );
  }
);

ListIcon.displayName = 'ListIcon';

// List content

interface IListContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
export const ListContent = forwardRef<HTMLDivElement, IListContentProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} {...props} className={cn('flex flex-grow flex-col gap-0.5', className)} />
    );
  }
);

ListContent.displayName = 'ListContent';

// List title

interface IListTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}
export const ListTitle = forwardRef<HTMLHeadingElement, IListTitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('font-NTSomic text-[0.8125rem] leading-tight', className)}
      />
    );
  }
);

ListTitle.displayName = 'ListTitle';

// List subtitle

interface IListSubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}
export const ListSubtitle = forwardRef<HTMLHeadingElement, IListSubtitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h2';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('font-sans text-[0.625rem] leading-[normal] text-[#B3B3B3]', className)}
      />
    );
  }
);

ListSubtitle.displayName = 'ListSubtitle';
