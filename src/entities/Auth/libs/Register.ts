import { AuthResponseDto } from '../model/AuthResponseDto';
import { RegisterRequestDto } from '../model/RegisterRequestDto';

export const Register = async (
  credentials: RegisterRequestDto
): Promise<AuthResponseDto> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signup`,
    {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
};
