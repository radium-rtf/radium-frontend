'use client';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Header } from '@/widgets/Header';
import { CourseBrief } from '@/widgets/CourseBrief';
import { CourseBanner } from '@/widgets/CourseBanner';
import { CourseSettings } from '@/widgets/CourseSettings';
import { CourseContacts } from '@/widgets/CourseContacts';
import { CourseDescription } from '@/widgets/CourseDescription';
import { CourseLandingEditToggle } from '@/widgets/CourseLandingEditToggle';
import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { useParams, useSearchParams } from 'next/navigation';
import {
  CourseAuthors,
  useCourseRoles,
  useGetCourseQuery,
} from '@/entities/Course';

export default function Page() {
  const params = useParams() as {
    courseId: string;
  };

  const { data: course } = useGetCourseQuery(params.courseId);

  const searchParams = useSearchParams() as {
    initialEdit?: string;
  };

  const { isAuthor, isCoauthor } = useCourseRoles(course);
  const isEditAllowed = isAuthor || isCoauthor;

  if (!course) return null;

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6' scroll={false}>
          <Image src='/logo.svg' alt='Radium' width={48} height={48} />
          <h1 className='font-mono text-4xl font-bold text-accent-primary-200'>
            Радиум
          </h1>
        </Link>
      </Header>
      <main className='flex flex-col'>
        <CourseEditContextWrapper
          isEditMode={searchParams.initialEdit === 'true'}
        >
          <CourseBanner
            name={course.name}
            url={course.banner}
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
                  courseLogo={course.logo}
                  shortDescription={course.shortDescription}
                  modulesCount={course.modules.length}
                  courseName={course.name}
                  courseId={course.id}
                  isEditAllowed={isEditAllowed}
                  isAssigned={course.isStudent}
                />
                <CourseDescription
                  courseId={course.id}
                  description={course.description}
                  isEditAllowed={isEditAllowed}
                />
              </main>
              <aside className='col-span-1 flex flex-col gap-8'>
                {isEditAllowed && <CourseLandingEditToggle />}
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
