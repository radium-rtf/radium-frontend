'use client';
import { useLayoutEffect } from 'react';
import { useGetAccountCoursesQuery } from '@/entities/Course';
import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCreate } from '@/features/CourseCreate';
import { AssignedCourseCard, AuthorShipCourseCard, CourseCard } from '@/widgets/CourseCard';
import { useSession } from 'next-auth/react';
import { Footer } from '@/widgets/Footer';
import { Card } from '@/shared';

export default function Home() {
  const { data: courses, isLoading } = useGetAccountCoursesQuery();
  const { data: session } = useSession();

  useLayoutEffect(() => {
    window.document.title = 'Мои курсы';
  }, []);

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6 transition-all' scroll={false}>
          <Image
            src='/logo.svg'
            quality={100}
            sizes='3rem 2.25rem'
            alt='Radium'
            width={48}
            height={48}
            priority
          />
          <h1 className='font-NTSomic text-4xl font-bold text-primary'>Радиум</h1>
        </Link>
      </Header>
      <main className='container mx-auto mb-8 flex flex-grow flex-col gap-6'>
        {isLoading && (
          <>
            <div className='bg-background-card ml-6 h-[42px] w-1/2 animate-pulse rounded-lg md:ml-16' />
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
                <h2 className='text-primary-default ml-6 font-mono text-[2rem] font-bold leading-[normal] md:ml-16'>
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
                <h2 className='text-primary-default ml-6 font-mono text-[2rem] font-bold leading-[normal] md:ml-16'>
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
