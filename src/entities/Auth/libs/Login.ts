import { AuthResponseDto, LoginRequestDto } from '@/entities/Auth';

export const Login = async (
  credentials: LoginRequestDto
): Promise<AuthResponseDto> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signin`,
    {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
};
