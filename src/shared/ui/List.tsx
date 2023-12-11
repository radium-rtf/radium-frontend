import React, {
    forwardRef,
    ForwardRefExoticComponent,
    LiHTMLAttributes,
    ReactNode,
    RefAttributes,
    SVGAttributes,
} from 'react';
import {cn} from '../utils/cn';
import {Slot} from '@radix-ui/react-slot';
import {Icon} from './Icon';

// List
interface IListProps extends React.HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

interface CompoundComponent
  extends ForwardRefExoticComponent<
    IListProps & RefAttributes<HTMLUListElement>
  > {
  Item: typeof Item;
  Icon: typeof ListIcon;
  Content: typeof ListContent;
  Title: typeof ListTitle;
  Subtitle: typeof ListSubtitle;
}

export const List = forwardRef<HTMLUListElement, IListProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return (
      <Comp ref={ref} {...props} className={cn('flex flex-col', className)} />
    );
  }
) as CompoundComponent;
List.displayName = 'List';

// List Item
interface IListItemProps extends LiHTMLAttributes<HTMLLIElement> {
  asChild?: boolean;
}

const Item = forwardRef<HTMLLIElement, IListItemProps>(
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
Item.displayName = 'ListItem';
List.Item = Item;

// List Icon

interface IListIconProps extends SVGAttributes<SVGSVGElement> {
  asChild?: boolean;
  icon?: Icon;
}

const ListIcon = forwardRef<SVGSVGElement, IListIconProps>(
  ({ asChild, icon, className, ...props }, ref) => {
    const Comp = asChild
      ? (Slot as ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> &
            RefAttributes<SVGSVGElement> & { children?: ReactNode }
        >)
      : Icon;
    return (
      <Comp
        {...props}
        type={icon || 'null'}
        ref={ref}
        className={cn('shrink-0 text-foreground-default', className)}
      />
    );
  }
);

ListIcon.displayName = 'ListIcon';
List.Icon = ListIcon;

// List content

interface IListContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const ListContent = forwardRef<HTMLDivElement, IListContentProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('flex flex-grow flex-col gap-0.5', className)}
      />
    );
  }
);

ListContent.displayName = 'ListContent';
List.Content = ListContent;

// List title

interface IListTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const ListTitle = forwardRef<HTMLHeadingElement, IListTitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          'font-mono text-[0.8125rem] leading-tight text-foreground-default',
          className
        )}
      />
    );
  }
);

ListTitle.displayName = 'ListTitle';
List.Title = ListTitle;

// List subtitle

interface IListSubtitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

const ListSubtitle = forwardRef<HTMLHeadingElement, IListSubtitleProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'h2';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(
          'font-sans text-[0.625rem] leading-[normal] text-foreground-secondary',
          className
        )}
      />
    );
  }
);

ListSubtitle.displayName = 'ListSubtitle';
List.Subtitle = ListSubtitle;
