import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { getCourse } from '@/entities/Course';
import { CourseInfo } from '@/widgets/CourseInfo';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const course = await getCourse(params.slug);

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
        {/*<div className='container mx-auto mb-16 px-12'>*/}
        <div className='mb-8 md:container md:mx-auto md:mb-16 md:px-12'>
          <Image
            src={course.banner}
            alt={course.name}
            width={1280}
            height={256}
            className='aspect-[2] w-full object-cover md:aspect-[3] md:rounded-lg lg:aspect-[4]'
            // className='aspect-[3] w-full rounded-lg object-cover'
          />
        </div>
        <div className='container mx-auto px-12 lg:px-[8.25rem]'>
          <CourseInfo course={course} />
        </div>
      </main>
    </>
  );
}
