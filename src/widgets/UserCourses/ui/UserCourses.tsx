import React, { FC } from 'react';
import { CourseCard, CourseResponseDto } from '@/entities/Course';

interface IProps {
  courses: CourseResponseDto[];
}

export const UserCourses: FC<IProps> = ({ courses }) => {
  return (
    <section className='container mx-auto grid grid-cols-2 gap-8'>
      {courses.map((course) => {
        return <CourseCard key={course.id} course={course} />;
      })}
    </section>
  );
};
