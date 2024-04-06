import { JWT } from 'next-auth/jwt';
import { SuccessAuthResponseDto } from '../model/SuccessAuthResponseDto';

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const body = {
      refreshToken: token.refreshToken,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const refreshedUser: SuccessAuthResponseDto = await response.json();

    if (!response.ok) {
      throw refreshedUser;
    }

    return {
      sub: refreshedUser.user.id,
      name: refreshedUser.user.name,
      email: refreshedUser.user.email,
      picture: refreshedUser.user.avatar,
      roles: refreshedUser.user.roles,
      accessToken: refreshedUser.accessToken,
      refreshToken: refreshedUser.refreshToken,
      expiresIn: refreshedUser.expiresIn,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}
