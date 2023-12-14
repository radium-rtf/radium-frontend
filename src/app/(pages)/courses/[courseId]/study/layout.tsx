'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useLayoutEffect } from 'react';
import { cn, Icon, List, Progress } from '@/shared';
import { Header } from '@/widgets/Header';
import { useParams } from 'next/navigation';
import { CourseEditToggle } from '@/features/CourseEditToggle';
import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { NavigationCreateModule } from '@/features/NavigationCreateModule';
import { CourseModuleNavigation } from '@/widgets/CourseModuleNavigation';
import { CreateCourseSection } from '@/features/CreateCourseSection';
import { useCourseRoles, useGetCourseQuery } from '@/entities/Course';
import { Footer } from '@/widgets/Footer';

interface CourseStudyLayoutProps {
  children: ReactNode;
}

export default function CourseStudyLayout({
  children,
}: CourseStudyLayoutProps) {
  const params: { courseId?: string; pageId?: string } = useParams();
  const { data: course } = useGetCourseQuery(params.courseId!, {
    skip: !params.courseId,
  });

  useLayoutEffect(() => {
    if (course) {
      window.document.title = course.name;
    }
  }, [course]);

  const { isAuthor, isCoauthor } = useCourseRoles(course);
  const isEditAllowed = isAuthor || isCoauthor;

  if (!course) return null;

  const { modules, maxScore, score, logo, name, id } = course;
  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          {logo ? (
            <Image
              src={logo}
              alt={name}
              width={48}
              height={48}
              className='h-12 w-12 rounded-lg object-cover'
            />
          ) : (
            <div className='h-12 w-12 rounded-lg bg-background-overlay object-cover'></div>
          )}
          <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
            {name}
          </h1>
        </Link>
      </Header>
      <main className='mb-8 flex flex-grow items-start gap-8 px-12'>
        <CourseEditContextWrapper>
          <nav className='sticky top-[8.625rem] -ml-6 flex max-h-[calc(100vh-8.65rem)] w-[calc(16.25rem)] flex-grow-0 flex-col'>
            {isEditAllowed && <CourseEditToggle />}
            <Progress
              className='px-6 py-2.5'
              theme='primary'
              percentage={((maxScore ? score : 1) / (maxScore || 1)) * 100}
              showPercentage
            />

            {course.groups.map((group, index) => (
              <List.Item key={index} asChild>
                <Link
                  href={`/groups/${group.id}/courses/${course.id}`}
                  className={cn(
                    'flex',
                    'rounded-lg border border-transparent transition-colors hover:border-white/10 hover:bg-white/5',
                    'px-[1.5rem] py-[0.5625rem]'
                  )}
                >
                  <Icon type={'group'} />
                  <List.Subtitle className='text-sm'>
                    {group.name}
                  </List.Subtitle>
                  <Icon
                    className='absolute right-[1.5rem] h-3 w-3'
                    type={'chevron-right'}
                  />
                </Link>
              </List.Item>
            ))}

            <ul
              className='
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
                    <CourseModuleNavigation
                      key={module.id}
                      module={module}
                      currentPage={params.pageId}
                    />
                  </li>
                );
              })}
              <li>
                <NavigationCreateModule className='w-full' courseId={id} />
              </li>
            </ul>
          </nav>
          <div className='flex flex-grow justify-center'>{children}</div>
          {params.pageId && <CreateCourseSection />}
        </CourseEditContextWrapper>
      </main>
      <Footer />
    </>
  );
}
