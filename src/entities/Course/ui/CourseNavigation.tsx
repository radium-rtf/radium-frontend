import { FC } from 'react';
import { CourseResponseDto } from '..';
import { Icon, List, ListItem, Progress, cn } from '@/shared';

interface IProps {
  modules: CourseResponseDto['modules'];
  className?: string;
}

export const CourseNavigation: FC<IProps> = ({ modules, className }) => {
  const score = modules.reduce((acc, module) => acc + module.score, 0);
  const maxScore = modules.reduce((acc, module) => acc + module.maxScore, 0);

  return (
    <nav className={cn('w-64', className)}>
      <Progress
        className='px-6 py-2.5'
        theme='primary'
        percentage={((maxScore ? score : 1) / (maxScore || 1)) * 100}
        showPercentage
      />
      <ul>
        {modules.map((module) => {
          return (
            <div key={module.id}>
              <h2 className='px-6 py-4 text-xl font-bold text-accent-primary-200'>
                {module.name}
              </h2>
              <List>
                {module.pages.map((page) => {
                  return (
                    <ListItem
                      key={page.id}
                      className=''
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
                        <Icon type='courses' />
                      )}
                      <div className='flex flex-col gap-0.5 text-start'>
                        <h2 className='text-sm leading-tight'>{page.name}</h2>
                        {!!page.maxScore && (
                          <p className='text-[0.625rem] leading-normal text-text-secondary'>{`${page.score}/${page.maxScore} баллов`}</p>
                        )}
                      </div>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          );
        })}
      </ul>
    </nav>
  );
};
