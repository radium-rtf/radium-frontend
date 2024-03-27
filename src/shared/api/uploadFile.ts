import { getSession } from 'next-auth/react';
import { UploadFileResponseDto } from '../model/uploadFileResponseDto';
import { IErrors } from '../interfaces/IErrors';

export const uploadFile = async (formData: FormData): Promise<UploadFileResponseDto | IErrors> => {
  const session = await getSession();

  if (!session) {
    throw Error('Not authenticated');
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/upload`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
      method: 'POST',
      body: formData,
    });

    if (response.status !== 201) {
      throw Error('Not authorized');
    }

    return response.json();
  } catch (error) {
    return 'Fetch error';
  }
};
