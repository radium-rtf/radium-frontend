import { LoginRequestDto } from '../model/LoginRequestDto';
import { SuccessAuthResponseDto } from '../model/SuccessAuthResponseDto';

export const Login = async (
  credentials: LoginRequestDto
): Promise<SuccessAuthResponseDto | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signin`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  }
};
