import { RegisterRequestDto } from '../model/RegisterRequestDto';
import { RegisterResponseDto } from '../model/RegisterResponseDto';

export const Register = async (
  credentials: RegisterRequestDto
): Promise<RegisterResponseDto | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/signup`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    });
    return response.json();
  } catch {
    return null;
  }
};
