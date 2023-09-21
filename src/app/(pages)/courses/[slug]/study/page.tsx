'use client';
import { CourseNavigation, useCourseQuery } from '@/entities/Course';
import { usePageQuery } from '@/entities/Page';
import { CoursePage } from '@/widgets/CoursePage';
import { Header } from '@/widgets/Header';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <>
      <SessionProvider>
        <Header isClient>
          <Link href='/' className='flex items-center gap-6'>
            <Image
              src={course.logo}
              alt={course.name}
              width={48}
              height={48}
              className='object-cover'
            />
            <h1 className='text-4xl font-bold text-accent-primary-200'>
              {course.name}
            </h1>
          </Link>
        </Header>
      </SessionProvider>
      <div className='flex flex-grow items-start gap-8 px-12'>
        <CourseNavigation
          modules={course.modules}
          className='-ml-6'
          currentPage={page.id}
        />
        <div className='flex flex-grow justify-center'>
          <CoursePage page={page} />
        </div>
      </div>
    </>
  );
}
