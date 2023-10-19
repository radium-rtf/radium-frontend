import { FC } from 'react';
import { CourseResponseDto } from '../model/courseResponseDto';
import { Icon, List, ListItem, Progress, cn } from '@/shared';

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
                  return (
                    <ListItem
                      key={page.id}
                      className={currentPage === page.id ? 'bg-grey-600' : ''}
                      href={`?page=${page.id}`}
                    >
                      {page.maxScore ? (
                        <Progress
                          type='radial'
                          percentage={(page.score / page.maxScore) * 100}
                          theme='primary'
                          className='text-transparent'
                        />
                      ) : (
                        <Icon type='courses' className='text-primary-default' />
                      )}
                      <div className='flex flex-col gap-0.5 text-start'>
                        <h2 className='text-[0.8125rem] leading-tight'>
                          {page.name}
                        </h2>
                        {!!page.maxScore && (
                          <p className='text-[0.625rem] leading-normal text-text-secondary'>{`${page.score}/${page.maxScore} баллов`}</p>
                        )}
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
