'use client';
import { CourseResponseDto } from '@/entities/Course';
import { List, cn } from '@/shared';
import { Slot } from '@radix-ui/react-slot';
import { FC, HTMLAttributes } from 'react';
import { CourseNavigationPage } from './CourseNavigationPage';

interface IProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  module: CourseResponseDto['modules'][0];
  currentPage?: string;
}

export const CourseNavigationModule: FC<IProps> = ({
  asChild,
  module,
  currentPage,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp {...props}>
      <h2
        className={cn(
          'px-6 py-4 text-xl font-bold leading-[normal] text-accent-primary-200',
          module.pages.map((e) => e.id).includes(currentPage!) &&
            'text-accent-secondary-300'
        )}
      >
        {module.name}
      </h2>
      <List>
        {module.pages.map((page) => {
          return <CourseNavigationPage page={page} key={page.id} />;
        })}
      </List>
    </Comp>
  );
};
