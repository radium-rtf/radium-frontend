import { FC } from 'react';
import { CourseResponseDto } from '../model/courseResponseDto';
import { List, Progress, cn } from '@/shared';
import Link from 'next/link';

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
        <ListItem className='text-sm px-[1.5rem] py-[0.5625rem] break-all' href={''}>
          <Icon type={'group'} />
          <p className='w-[70%]'>
            УрФУ.Осень2024
          </p>
          <Icon className='absolute w-3 h-3 right-[1.5rem]' type={'chevron-right'} />
        </ListItem>
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
                    <List.Item key={page.id} asChild>
                      <Link
                        href={`?page=${page.id}`}
                        className={cn(
                          'rounded-lg border border-transparent transition-colors hover:border-white/10 hover:bg-white/5',
                          currentPage === page.id &&
                            'border-white/10 bg-white/5'
                        )}
                      >
                        <List.Icon
                          icon='courses'
                          className='text-primary-default'
                          asChild={page.maxScore !== 0}
                        >
                          <Progress
                            type='radial'
                            percentage={(page.score / page.maxScore) * 100}
                            theme='primary'
                            className='text-transparent'
                          />
                        </List.Icon>

                        <List.Content>
                          <List.Title>{page.name}</List.Title>
                          {!!page.maxScore && (
                            <List.Subtitle>{`${page.score}/${page.maxScore} баллов`}</List.Subtitle>
                          )}
                        </List.Content>
                      </Link>
                    </List.Item>
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
