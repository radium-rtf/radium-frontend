'use client';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { useSession } from 'next-auth/react';
import { CourseCreate } from '@/features/CourseCreate';
import { Card } from '@radium-ui-kit/Card';
import { useUpdateTitle } from '@/shared';
import { useGetAccountCoursesQuery } from '@/entities/Course';
import { AssignedCourseCard, AuthorShipCourseCard, CourseCard } from '@/widgets/CourseCard';

export default function AllCoursesPage() {
  const { data: courses, isLoading } = useGetAccountCoursesQuery();
  const { data: session } = useSession();

  useUpdateTitle('Мои курсы');

  return (
    <>
      <Header logoUrl='/logo.svg' title='Радиум' />
      <main className='container mx-auto my-12 flex flex-grow flex-col gap-6'>
        {isLoading && (
          <>
            <div className='ml-6 h-[42px] w-1/2 animate-pulse rounded-lg bg-card md:ml-16' />
            <section className='container mx-auto grid gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, index) => (
                <Card className='h-64 animate-pulse' key={index}>
                  {''}
                </Card>
              ))}
            </section>
          </>
        )}
        {courses && (
          <>
            {(!!courses.authorship.length ||
              session?.user.roles.isAuthor ||
              session?.user.roles.isCoauthor) && (
              <section className='container mx-auto grid gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-3'>
                {courses?.authorship.map((course) => {
                  return <AuthorShipCourseCard key={course.id} course={course} />;
                })}
                {session?.user.roles.isAuthor && <CourseCreate />}
              </section>
            )}
            {!!courses.my.length && (
              <>
                <h2 className='ml-6 font-NTSomic text-xl font-bold leading-[normal] text-primary md:ml-16'>
                  Ваши курсы
                </h2>
                <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-3'>
                  {courses.my.map((course) => {
                    return <AssignedCourseCard key={course.id} course={course} />;
                  })}
                </section>
              </>
            )}
            {!!courses.recommendations.length && (
              <>
                <h2 className='ml-6 font-NTSomic text-xl font-bold leading-[normal] text-primary md:ml-16'>
                  Рекомендации
                </h2>
                <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 2xl:grid-cols-3'>
                  {courses.recommendations.map((course) => {
                    return <CourseCard key={course.id} course={course} />;
                  })}
                </section>
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
