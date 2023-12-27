import { LoginRequestDto } from '../model/LoginRequestDto';
import { ErrorAuthResponseDto } from '../model/ErrorAuthResponseDto';
import { SuccessAuthResponseDto } from '../model/SuccessAuthResponseDto';

export const Login = async (
  credentials: LoginRequestDto
): Promise<SuccessAuthResponseDto | ErrorAuthResponseDto> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signin`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    });
    return response.json();
  } catch {
    return 'record not found';
  }
};
