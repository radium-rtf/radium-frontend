import {
  ButtonHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
  SVGAttributes,
} from 'react';
import { cn } from '../utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { Icon } from './Icon';

// Menu
interface IMenuProps extends HTMLAttributes<HTMLUListElement> {
  asChild?: boolean;
}

interface CompoundComponent
  extends ForwardRefExoticComponent<IMenuProps & RefAttributes<HTMLUListElement>> {
  Item: typeof MenuItem;
  Icon: typeof MenuIcon;
  Text: typeof MenuText;
}

export const Menu = forwardRef<HTMLUListElement, IMenuProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'ul';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('bg-bg-overlay overflow-hidden rounded-lg py-2', className)}
      />
    );
  }
) as CompoundComponent;

Menu.displayName = 'Menu';

// Menu Item
interface IMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const MenuItem = forwardRef<HTMLButtonElement, IMenuItemProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <li>
        <Comp
          ref={ref}
          {...props}
          className={cn(
            'flex w-full items-center gap-4 rounded-lg border border-transparent px-6 py-2 -outline-offset-1 outline-white transition-colors hover:border-white/5 hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline',
            className
          )}
        />
      </li>
    );
  }
);

MenuItem.displayName = 'MenuItem';
Menu.Item = MenuItem;

// Menu Icon
interface IMenuIconProps extends SVGAttributes<SVGSVGElement> {
  asChild?: boolean;
  icon?: Icon;
}

const MenuIcon = forwardRef<SVGSVGElement, IMenuIconProps>(
  ({ className, asChild, icon, ...props }, ref) => {
    const Comp = asChild
      ? (Slot as ForwardRefExoticComponent<
          SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
        > & {
          children?: ReactNode;
        })
      : Icon;
    return (
      <Comp
        {...props}
        type={icon || 'blank'}
        ref={ref}
        className={cn('h-[1.125rem] text-primary', className)}
      />
    );
  }
);

MenuIcon.displayName = 'MenuIcon';
Menu.Icon = MenuIcon;

// Menu text
interface IMenuTextProps extends HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

const MenuText = forwardRef<HTMLParagraphElement, IMenuTextProps>(
  ({ className, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn('flex-grow text-start text-[0.8125rem] text-text-primary', className)}
      />
    );
  }
);

MenuText.displayName = 'MenuText';
Menu.Text = MenuText;
