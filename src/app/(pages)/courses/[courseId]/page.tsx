'use client';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CourseBanner, CourseBannerSkeleton } from '@/widgets/CourseBanner';
import { CourseContacts, CourseContactsSkeleton } from '@/widgets/CourseContacts';
import { CourseDescription, CourseDescriptionSkeleton } from '@/widgets/CourseDescription';
import { useParams } from 'next/navigation';
import { useCourseRoles, useGetCourseQuery } from '@/entities/Course';
import { CourseAuthors, CourseAuthorsSkeleton } from '@/widgets/CourseAuthors';
import { useUpdateTitle } from '@/shared';
import { CourseBrief, CourseBriefSkeleton } from '@/widgets/CourseBrief';

export default function Page() {
  const params = useParams() as {
    courseId: string;
  };

  const { data: course, isLoading } = useGetCourseQuery(params.courseId);

  useUpdateTitle(course?.name || '<без названия>');

  const { isAuthor, isCoauthor } = useCourseRoles(course);
  const isEditAllowed = isAuthor || isCoauthor;

  return (
    <>
      <Header title='Радиум' logoUrl='/logo.svg' />
      <main className='container grow'>
        <div className='sticky top-16 py-12'>
          {/* "Это костыль" */}
          <div className='sticky top-16 z-10 -mt-12 h-12 bg-backgroundPage'>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute bottom-0 right-0 translate-y-full'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 0H16V16C16 7.16344 8.83656 0 0 0Z'
                className='fill-backgroundPage'
              />
            </svg>
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='absolute bottom-0 left-0 translate-y-full -rotate-90'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M0 0H16V16C16 7.16344 8.83656 0 0 0Z'
                className='fill-backgroundPage'
              />
            </svg>
          </div>
          {isLoading && (
            <>
              <CourseBannerSkeleton />
              <CourseBriefSkeleton />
              <div className='contents items-start gap-8 lg:flex'>
                <div className='mb-8 grid shrink-0 grid-cols-2 items-start gap-8 lg:order-1 lg:mb-0 lg:w-[22.5rem] lg:grid-cols-1'>
                  <CourseAuthorsSkeleton />
                  <CourseContactsSkeleton />
                </div>
                <CourseDescriptionSkeleton />
              </div>
            </>
          )}
          {course && (
            <>
              <CourseBanner
                isEditAllowed={isEditAllowed}
                courseId={course.id}
                alt={course.name}
                src={course.banner}
              />
              <CourseBrief
                isEditAllowed={isEditAllowed}
                percentage={(course.score / (course.maxScore || 1)) * 100}
                title={course.name}
                logo={course.logo}
                courseId={course.id}
                isAssigned={course.isStudent}
                modulesCount={course.modules.length}
                shortDescription={course.shortDescription}
              />
              <div className='contents items-start gap-8 lg:flex'>
                <div className='mb-8 grid shrink-0 grid-cols-2 items-start gap-8 lg:order-1 lg:mb-0 lg:w-[22.5rem] lg:grid-cols-1'>
                  <CourseAuthors authors={course.authors} coauthors={course.coauthors} />
                  <CourseContacts contacts={course.links} />
                </div>
                <CourseDescription description={course.description} />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
