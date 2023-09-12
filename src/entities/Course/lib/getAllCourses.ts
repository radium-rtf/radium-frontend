import { CourseResponseDto } from '@/entities/Course';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';

export const getAllCourses = async (): Promise<CourseResponseDto[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/course`
  );

  return response.json();
};
