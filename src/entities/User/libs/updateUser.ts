import { getSession } from 'next-auth/react';
import { UpdateUserRequestDto } from '../model/UpdateUserRequestDto';
import { IErrors } from '@/shared';

export const updateUser = async (data: UpdateUserRequestDto): Promise<'OK' | IErrors> => {
  const session = await getSession();

  if (!session) {
    throw Error('Not authenticated');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/account`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      method: 'PATCH',
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return 'OK';
    }
  } catch {
    return 'Fetch error';
  }
  return 'Fetch error';
};
