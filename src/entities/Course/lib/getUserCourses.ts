import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';
import { AccountCoursesResponseDto } from '../model/accountCoursesResponseDto';

export const getUserCourses = async (): Promise<AccountCoursesResponseDto> => {
  const session = await getServerSession(authOptions);

  if (!session) throw Error('Not authenticated');

  return fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/account/courses`, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((data) => data.json());
};
