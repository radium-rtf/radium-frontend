import React from 'react';
import { CourseCard, getUserCourses } from '@/entities/Course';
import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/entities/Auth';
import { CourseCreate } from '@/features/CourseCreate';

export default async function Home() {
  const courses = await getUserCourses();
  const session = await getServerSession(authOptions);

  if (typeof courses === 'string') {
    if (courses === 'Not authenticated') {
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
      <main className='container mx-auto flex flex-col gap-6'>
        {(!!courses.my.length ||
          session?.user.roles.isAuthor ||
          session?.user.roles.isTeacher) && (
          <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 xl:grid-cols-3'>
            <h2 className='ml-6 font-mono text-[2rem] font-bold leading-[normal] text-primary-default lg:col-span-2 xl:col-span-3'>
              Вы изучаете
            </h2>
            {courses.my.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
            {(session?.user.roles.isAuthor ||
              session?.user.roles.isTeacher) && <CourseCreate />}
          </section>
        )}
        {!!courses.recommendations.length && (
          <section className='container mx-auto grid grid-cols-1 gap-8 px-6 md:px-12 lg:grid-cols-2 xl:grid-cols-3'>
            <h2 className='ml-6 font-mono text-[2rem] font-bold leading-[normal] text-primary-default lg:col-span-2 xl:col-span-3'>
              Рекомендации
            </h2>
            {courses.recommendations.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </section>
        )}
      </main>
    </>
  );
}
