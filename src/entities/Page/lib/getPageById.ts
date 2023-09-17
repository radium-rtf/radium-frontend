import { IErrors } from '@/shared';
import { PageResponseDto } from '..';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/entities/Auth';

export const getPageById = async (
  id: string
): Promise<PageResponseDto | IErrors> => {
  const session = await getServerSession(authOptions);
  if (!session) return 'Not authenticated';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/page/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      }
    );
    if (response.status !== 200) return 'Not authorized';

    return response.json();
  } catch (error) {
    return 'Fetch error';
  }
};
