import { SuccessAuthResponseDto } from '../model/SuccessAuthResponseDto';
import { VerifyRegistrationRequestDto } from '../model/VerifyRegistrationRequestDto';

export const VerifyRegistration = async (
  credentials: VerifyRegistrationRequestDto
): Promise<SuccessAuthResponseDto | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/verify`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(credentials),
    });
    return response.json();
  } catch {
    return null;
  }
};
