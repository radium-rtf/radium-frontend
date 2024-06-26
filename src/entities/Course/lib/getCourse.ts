import { CourseResponseDto } from '../model/CourseResponseDto';
import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';
import { IErrors } from '@/shared';

export const getCourse = async (courseSlug: string): Promise<CourseResponseDto | IErrors> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return 'Not authenticated';
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/course/slug/${courseSlug}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      return 'Not authorized';
    }

    return response.json();
  } catch (error) {
    return 'Fetch error';
  }
};
