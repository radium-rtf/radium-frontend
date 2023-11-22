import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { CourseAuthors, getCourse } from '@/entities/Course';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { CourseBanner } from '@/widgets/CourseBanner';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/entities/Auth';
import { CourseBrief } from '@/widgets/CourseBrief';
import { CourseDescription } from '@/widgets/CourseDescription';
import { CourseLandingEditToggle } from '@/widgets/CourseLandingEditToggle';
import { CourseSettings } from '@/widgets/CourseSettings';
import { CourseContacts } from '@/widgets/CourseContacts';

interface IProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  // fetch data
  const course = await getCourse(params.slug);

  if (typeof course === 'string') {
    return {
      title: 'Курс не найден - Radium',
    };
  }

  return {
    title: `${course.name} - Radium`,
  };
}

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const course = await getCourse(params.slug);
  const session = await getServerSession(authOptions);

  const isEditAllowed =
    session!.user.roles.isAuthor || session!.user.roles.isTeacher;

  if (typeof course === 'string') {
    if (course === 'Not authenticated') {
      redirect('/login');
    }
    return;
  }

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          <Image src='/logo.svg' alt='Radium' width={48} height={48} />
          <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
            Радиум
          </h1>
        </Link>
      </Header>
      <main className='flex flex-col'>
        <CourseEditContextWrapper>
          <CourseBanner
            name={course.name}
            url={course.logo}
            courseId={course.id}
            isEditAllowed={isEditAllowed}
          />
          <main className='container mx-auto px-12 lg:px-[8.25rem]'>
            <div className='grid gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
              <h1 className='mx-4 break-all font-mono text-5xl font-bold leading-[normal] text-accent-primary-200 lg:col-span-3 2xl:col-span-4'>
                {course.name}
              </h1>
              <main className='flex flex-col gap-8 lg:col-span-2 2xl:col-span-3'>
                <CourseBrief
                  shortDescription={course.shortDescription}
                  modulesCount={course.modules.length}
                  courseName={course.name}
                  courseId={course.id}
                  isEditAllowed={isEditAllowed}
                />
                <CourseDescription
                  courseId={course.id}
                  description={course.description}
                  isEditAllowed={isEditAllowed}
                />
              </main>
              <aside className='col-span-1 flex flex-col gap-8'>
                <CourseLandingEditToggle />
                {isEditAllowed && (
                  <CourseSettings
                    hasName={course.name !== ''}
                    hasShortDescription={course.shortDescription !== ''}
                    hasDescription={course.description !== ''}
                    hasLogo={course.logo !== ''}
                    hasBanner={course.banner !== ''}
                    courseId={course.id}
                    isPublished={course.isPublished}
                  />
                )}
                <CourseAuthors authors={course.authors} />
                <CourseContacts
                  isEditAllowed={isEditAllowed}
                  contacts={course.links}
                />
              </aside>
            </div>
          </main>
        </CourseEditContextWrapper>
      </main>
    </>
  );
}
