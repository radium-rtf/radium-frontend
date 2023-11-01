'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/widgets/Header';
import { Progress } from '@/shared';
import { CoursePage } from '@/widgets/CoursePage';
import { usePageQuery } from '@/entities/Page';
import { useCourseQuery } from '@/entities/Course';
import { CourseEditToggle } from '@/features/CourseEditToggle';
import { CourseModuleNavigation } from '@/widgets/CourseModuleNavigation';
import { NavigationCreateModule } from '@/features/NavigationCreateModule';

interface IProps {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
}

export default function Page({ params, searchParams }: IProps) {
  const { data: course } = useCourseQuery(params.slug);

  const { data: page } = usePageQuery(
    searchParams.page || (course?.modules[0].pages[0].id as string),
    { skip: !course || !course.modules.length || !course.modules[0].pages }
  );

  if (!course || !page) {
    return null;
  }

  const isEditing = searchParams.isEditing === 'true';
  window.document.title = `${page.name} - ${course.name}`;

  const { modules, maxScore, score } = course;
  const currentPage = page.id;

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          <Image
            src={course.logo}
            alt={course.name}
            width={48}
            height={48}
            className='object-cover'
          />
          <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
            {course.name}
          </h1>
        </Link>
      </Header>
      <div className='flex flex-grow items-stretch gap-8 px-12'>
        <nav className='sticky top-[8.625rem] -ml-6 flex h-[calc(100vh-8.65rem)] w-64 flex-grow-0 flex-col'>
          <CourseEditToggle />
          <Progress
            className='px-6 py-2.5'
            theme='primary'
            percentage={((maxScore ? score : 1) / (maxScore || 1)) * 100}
            showPercentage
          />
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
                    isEditing={isEditing}
                    currentPage={currentPage}
                  />
                </li>
              );
            })}
            <li>
              {isEditing && (
                <NavigationCreateModule
                  className='w-full'
                  courseId={course.id}
                />
              )}
            </li>
          </ul>
        </nav>
        <div className='flex flex-grow justify-center'>
          <CoursePage page={page} />
        </div>
      </div>
    </>
  );
}
