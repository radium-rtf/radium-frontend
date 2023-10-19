import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: string | null;
  }
  interface Session {
    user: {
      accessToken?: string | null;
      refreshToken?: string | null;
      expiresIn?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: string | null;
  }
}
