import { User } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const body = {
      refreshToken: token.refreshToken,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    const refreshedUser: User | AdapterUser = await response.json();

    if (!response.ok) {
      throw refreshedUser;
    }

    return {
      sub: refreshedUser.id,
      name: refreshedUser.name,
      email: refreshedUser.email,
      picture: refreshedUser.image,
      roles: refreshedUser.roles,
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
