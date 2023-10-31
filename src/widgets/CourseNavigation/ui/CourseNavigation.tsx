import { FC } from 'react';
import { Progress, cn } from '@/shared';
import { CourseEditToggle } from '@/features/CourseEditToggle';
import { CourseResponseDto } from '@/entities/Course';
import { CourseNavigationModule } from '@/features/CourseNavigationModule';

interface IProps {
  modules: CourseResponseDto['modules'];
  className?: string;
  currentPage?: string;
}

export const CourseNavigation: FC<IProps> = ({
  modules,
  className,
  currentPage,
}) => {
  const score = modules.reduce((acc, module) => acc + module.score, 0);
  const maxScore = modules.reduce((acc, module) => acc + module.maxScore, 0);

  return (
    <nav className={cn('sticky top-[8.625rem] w-64', className)}>
      <CourseEditToggle />
      <Progress
        className='px-6 py-2.5'
        theme='primary'
        percentage={((maxScore ? score : 1) / (maxScore || 1)) * 100}
        showPercentage
      />
      <ul
        className='
      max-h-[calc(100vh-11.125rem)] 
      overflow-y-scroll
      [&::-webkit-scrollbar-thumb]:rounded
      [&::-webkit-scrollbar-thumb]:bg-transparent
      [&::-webkit-scrollbar-thumb]:transition-colors
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar]:opacity-0
      [&:hover::-webkit-scrollbar-thumb]:bg-grey-300
      '
      >
        {modules.map((module) => {
          return (
            <li key={module.id}>
              <CourseNavigationModule
                module={module}
                currentPage={currentPage}
                key={module.id}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
