import React, { FC, useState } from 'react';
import {
  CourseAuthors,
  CourseBrief,
  CourseContacts,
  CourseDescription,
  CourseResponseDto,
} from '@/entities/Course';

interface IProps {
  course: CourseResponseDto;
}

export const CourseInfo: FC<IProps> = ({ course }) => {
  return (
    <section className='grid gap-8 lg:grid-cols-3 2xl:grid-cols-4'>
      <h1 className='mx-4 mb-4 break-all text-5xl font-bold text-accent-primary-200 lg:col-span-3 2xl:col-span-4'>
        {course.name}
      </h1>
      <main className='flex flex-col gap-8 lg:col-span-2 2xl:col-span-3'>
        <CourseBrief
          shortDescription={course.shortDescription}
          modulesCount={course.modules.length}
        />
        <CourseDescription description={course.description} />
      </main>
      <aside className='col-span-1 flex flex-col gap-8'>
        <CourseAuthors authors={course.authors} />
        <CourseContacts contacts={course.links} />
      </aside>
    </section>
  );
};
