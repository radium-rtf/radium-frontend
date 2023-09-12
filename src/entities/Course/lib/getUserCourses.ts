import { CourseResponseDto } from '@/entities/Course';
import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';

export const getUserCourses = async (): Promise<CourseResponseDto[]> => {
  const session = await getServerSession(authOptions);

  if (!session) throw Error('Not authenticated');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/account/courses`,
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    }
  );

  if (response.status !== 200) throw Error('Not authorized');

  return response.json();
};
