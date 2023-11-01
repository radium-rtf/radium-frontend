'use client';
import { CourseResponseDto } from '@/entities/Course';
import { NavigationCreatePage } from '@/features/NavigationCreatePage';
import { NavigationModuleTitle } from '@/features/NavigationModuleTitle';
import { NavigationPageTitle } from '@/features/NavigationPageTitle';
import { FC, HTMLAttributes } from 'react';

interface IProps extends HTMLAttributes<HTMLElement> {
  module: CourseResponseDto['modules'][0];
  currentPage?: string;
  isEditing?: boolean;
}

export const CourseModuleNavigation: FC<IProps> = ({
  module,
  currentPage,
  isEditing = false,
  ...props
}) => {
  const isCurrentPage = module.pages.map((e) => e.id).includes(currentPage!);
  return (
    <nav {...props}>
      <NavigationModuleTitle
        name={module.name}
        isCurrentModule={isCurrentPage}
      />
      {module.pages.map((page) => (
        <NavigationPageTitle
          key={page.id}
          page={page}
          currentPage={currentPage}
        />
      ))}
      {isEditing && <NavigationCreatePage moduleId={module.id} />}
    </nav>
  );
};
