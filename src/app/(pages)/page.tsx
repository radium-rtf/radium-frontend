import React from 'react';
import { getUserCourses } from '@/entities/Course';
import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import { UserCourses } from '@/widgets/UserCourses';
import { redirect } from 'next/navigation';

export default async function Home() {
  const courses = await getUserCourses();

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
      <main className='flex flex-col'>
        <UserCourses courses={courses} />
      </main>
    </>
  );
}
