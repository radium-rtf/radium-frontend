import { authOptions } from '@/entities/Auth';
import { getServerSession } from 'next-auth';
import { IErrors } from '@/shared';
import { AnswerResponseDto } from '../model/answerResponseDto';
import { AnswerRequestDto } from '../model/answerRequestDto';

export const Answer = async (
  body: AnswerRequestDto
): Promise<AnswerResponseDto | IErrors> => {
  const session = await getServerSession(authOptions);
  if (!session) return 'Not authenticated';

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/answer`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (response.status !== 200) return 'Not authorized';

    return response.json();
  } catch (error) {
    return 'Fetch error';
  }
};
