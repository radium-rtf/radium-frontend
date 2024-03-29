'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { CourseBrief, CourseBriefSkeleton } from '@/widgets/CourseBrief';
import { CourseBanner, CourseBannerSkeleton } from '@/widgets/CourseBanner';
import { CourseSettings } from '@/widgets/CourseSettings';
import { CourseContacts, CourseContactsSkeleton } from '@/widgets/CourseContacts';
import { CourseDescription, CourseDescriptionSkeleton } from '@/widgets/CourseDescription';
import { CourseLandingEditToggle } from '@/widgets/CourseLandingEditToggle';
import { CourseEditContextWrapper } from '@/features/CourseEditContext';
import { useParams, useSearchParams } from 'next/navigation';
import { useCourseRoles, useGetCourseQuery } from '@/entities/Course';
import { CourseName, CourseNameSkeleton } from '@/widgets/CourseName';
import { CourseAuthors, CourseAuthorsSkeleton } from '@/widgets/CourseAuthors';
import { Button, Icon, useUpdateTitle } from '@/shared';

export default function Page() {
  const params = useParams() as {
    courseId: string;
  };

  const { data: course, isLoading, error } = useGetCourseQuery(params.courseId);

  useUpdateTitle(course?.name || '<без названия>');

  const searchParams = useSearchParams();

  const { isAuthor, isCoauthor } = useCourseRoles(course);
  const isEditAllowed = isAuthor || isCoauthor;

  return (
    <>
      <Header title='Радиум' logoUrl='/logo.svg' />
      <main className='mb-8 mt-[8.25rem] flex flex-grow flex-col'>
        {/* Loading skeleton */}
        {isLoading && (
          <>
            <CourseBannerSkeleton />
            <main className='container mx-auto px-12 lg:px-[8.25rem]'>
              <div className='grid gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
                <CourseNameSkeleton />
                <main className='flex flex-col gap-8 xl:col-span-2 2xl:col-span-3'>
                  <CourseBriefSkeleton />
                  <CourseDescriptionSkeleton />
                </main>
                <aside className='flex flex-col gap-8'>
                  <CourseAuthorsSkeleton />
                  <CourseContactsSkeleton />
                </aside>
              </div>
            </main>
          </>
        )}
        {/* Course data */}
        {course && (
          <CourseEditContextWrapper isEditMode={searchParams.get('initialEdit') === 'true'}>
            <CourseBanner
              name={course.name}
              url={course.banner}
              courseId={course.id}
              isEditAllowed={isEditAllowed}
            />
            <main className='container mx-auto px-12 lg:px-[8.25rem]'>
              <div className='grid gap-8 xl:grid-cols-3 2xl:grid-cols-4'>
                <CourseName courseName={course.name} isEditAllowed={isEditAllowed} />
                <main className='flex flex-col gap-8 xl:col-span-2 2xl:col-span-3'>
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
                <aside className='flex flex-col gap-8'>
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
                      isEditAllowed={isAuthor}
                    />
                  )}
                  <CourseAuthors
                    courseId={course.id}
                    isEditAllowed={isAuthor}
                    authors={course.authors}
                    coauthors={course.coauthors}
                  />
                  <CourseContacts
                    courseId={course.id}
                    isEditAllowed={isEditAllowed}
                    contacts={course.links}
                  />
                </aside>
              </div>
            </main>
          </CourseEditContextWrapper>
        )}
        {/* Error */}
        {error && (
          <>
            <div className='flex h-full flex-col items-center justify-center gap-4'>
              <Image src={'/error.svg'} width={224} height={224} alt='Not found error' />
              <h1 className='text-5xl font-NTSomic font-bold text-primary'>Такого курса нет :(</h1>
              <p className='text-text-primary text-[0.8125rem]'>
                Возможно курс был удален или вы перешли по неверной ссылке
              </p>
              <Button color='accent' asChild className='w-64'>
                <Link href='/'>
                  <Icon type='arrow-left' className='text-inherit' />
                  <span className='ml-[calc(50%-34px)] -translate-x-1/2'>На главную</span>
                </Link>
              </Button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
