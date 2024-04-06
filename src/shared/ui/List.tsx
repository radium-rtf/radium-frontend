import React, {
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  LiHTMLAttributes,
  ReactNode,
  RefAttributes,
  SVGAttributes,
} from 'react';
import { cn } from '../utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { SmallIcon } from './SmallIcon';
import { Icon } from './Icon';

// List
type ListProps = HTMLAttributes<HTMLUListElement> & {
  asChild?: boolean;
};

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return <Comp ref={ref} {...props} className={cn('flex flex-col', className)} />;
  }
);
List.displayName = 'List';

// List Item
type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {
  asChild?: boolean;
};

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'li';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          'flex shrink-0 items-center gap-4 rounded-[0.5rem] border border-transparent px-6 py-[0.5625rem] transition-colors',
          className
        )}
      ></Comp>
    );
  }
);
ListItem.displayName = 'ListItem';

// List Icon
type ListIconProps = SVGAttributes<SVGSVGElement> & {
  asChild?: boolean;
  icon?: Icon;
};
export const ListIcon = forwardRef<SVGSVGElement, ListIconProps>(
  ({ asChild, icon, className, ...props }, ref) => {
    const Comp = asChild
      ? (Slot as ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement> & { children?: ReactNode }
        >)
      : Icon;
    return (
      <Comp
        {...props}
        type={icon || 'blank'}
        ref={ref}
        className={cn('shrink-0 text-accent-primary', className)}
      />
    );
  }
);

ListIcon.displayName = 'ListIcon';

// List Icon
type ListActionIconProps = SVGAttributes<SVGSVGElement> & {
  asChild?: boolean;
  icon?: SmallIcon;
};
export const ListActionIcon = forwardRef<SVGSVGElement, ListActionIconProps>(
  ({ asChild, icon, className, ...props }, ref) => {
    const Comp = asChild
      ? (Slot as ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement> & { children?: ReactNode }
        >)
      : SmallIcon;
    return (
      <Comp
        {...props}
        type={icon || 'blank'}
        ref={ref}
        className={cn('text-text shrink-0', className)}
      />
    );
  }
);

ListActionIcon.displayName = 'ListIcon';

// List content

interface IListContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}
export const ListContent = forwardRef<HTMLDivElement, IListContentProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('shrink grow space-y-0.5 overflow-hidden', className)}
      />
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
        className={cn('line-clamp-1 font-NTSomic  text-base leading-tight', className)}
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
        className={cn('line-clamp-1 text-sm leading-[normal]  text-text-secondary', className)}
      />
    );
  }
);

ListSubtitle.displayName = 'ListSubtitle';
