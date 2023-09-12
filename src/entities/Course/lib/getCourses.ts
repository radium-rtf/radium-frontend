import { CourseResponseDto } from '@/entities/Course';
import { getSession } from 'next-auth/react';
import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';

export const GetCourses = async (): Promise<CourseResponseDto[]> => {
  const session = await getServerSession(authOptions);

  if (!session) throw Error('Not authorized');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/course`
  );

  return response.json();
};
