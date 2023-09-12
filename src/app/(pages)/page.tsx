import React from 'react';
import { GetCourses } from '@/entities/Course';
import { Header } from '@/widgets/Header';
import Link from 'next/link';
import Image from 'next/image';

export default async function Home() {
  const courses = await GetCourses();

  return (
    <>
      <Header>
        <Link href='/' className='flex items-center gap-6'>
          <Image src='/logo.svg' alt='Radium' width={48} height={48} />
          <h1 className='text-4xl font-bold text-accent-primary-200'>Радиум</h1>
        </Link>
      </Header>
      <main>{courses.length}</main>
    </>
  );
}
