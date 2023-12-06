'use client';
import { CourseResponseDto } from '@/entities/Course';
import { CourseEditContext } from '@/features/CourseEditContext';
import { NavigationCreatePage } from '@/features/NavigationCreatePage';
import { NavigationModuleTitle } from '@/features/NavigationModuleTitle';
import { NavigationPageTitle } from '@/features/NavigationPageTitle';
import { FC, HTMLAttributes, useContext } from 'react';

interface IProps extends HTMLAttributes<HTMLElement> {
  module: CourseResponseDto['modules'][0];
  currentPage?: string;
}

export const CourseModuleNavigation: FC<IProps> = ({
  module,
  currentPage,
  ...props
}) => {
  const { isEditing } = useContext(CourseEditContext);
  const isCurrentModule = module.pages.map((e) => e.id).includes(currentPage!);
  return (
    <nav {...props}>
      <NavigationModuleTitle
        name={module.name}
        moduleId={module.id}
        isCurrentModule={isCurrentModule}
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
