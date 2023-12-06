'use client';
import React from 'react';
import { useGetAccountCoursesQuery } from '@/entities/Course';
import { Header, HeaderSkeleton } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import { CourseCreate } from '@/features/CourseCreate';
import {
  AssignedCourseCard,
  AuthorShipCourseCard,
  CourseCard,
} from '@/widgets/CourseCard';
import { useSession } from 'next-auth/react';
import { UserCoursesSkeleton } from '@/widgets/UserCourses';

export default function Home() {
  const { data: courses, isLoading } = useGetAccountCoursesQuery();
  const { data: session } = useSession();

  if (isLoading) {
    return (
      <>
        <HeaderSkeleton />
        <main className='flex flex-col'>
          <UserCoursesSkeleton />
        </main>
      </>
    );
  }

  if (!courses) {
    return null;
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
      <main className='container mx-auto flex flex-col gap-6'>
        {(!!courses.authorship.length ||
          session?.user.roles.isAuthor ||
          session?.user.roles.isTeacher) && (
          <>
            <h2 className='ml-6 font-mono text-[2rem] font-bold leading-[normal] text-primary-default md:ml-16 lg:col-span-2 xl:col-span-3'>
              В вашем авторстве
            </h2>
            <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 xl:grid-cols-3'>
              {courses.authorship.map((course) => {
                return <AuthorShipCourseCard key={course.id} course={course} />;
              })}
              {session?.user.roles.isAuthor && <CourseCreate />}
            </section>
          </>
        )}
        {!!courses.my.length && (
          <>
            <h2 className='ml-6 font-mono text-[2rem] font-bold leading-[normal] text-primary-default md:ml-16 lg:col-span-2 xl:col-span-3'>
              Ваши курсы
            </h2>
            <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 xl:grid-cols-3'>
              {courses.my.map((course) => {
                return <AssignedCourseCard key={course.id} course={course} />;
              })}
            </section>
          </>
        )}
        {!!courses.recommendations.length && (
          <>
            <h2 className='ml-6 font-mono text-[2rem] font-bold leading-[normal] text-primary-default md:ml-16 lg:col-span-2 xl:col-span-3'>
              Рекомендации
            </h2>
            <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 xl:grid-cols-3'>
              {courses.recommendations.map((course) => {
                return <CourseCard key={course.id} course={course} />;
              })}
            </section>
          </>
        )}
      </main>
    </>
  );
}
