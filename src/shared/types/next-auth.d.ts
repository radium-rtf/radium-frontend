import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: string | null;
    roles: {
      isTeacher: boolean;
      isAuthor: boolean;
      isCoauthor: boolean;
    };
  }

  interface Session {
    user: {
      accessToken?: string | null;
      refreshToken?: string | null;
      expiresIn?: string | null;
      roles: {
        isTeacher: boolean;
        isAuthor: boolean;
        isCoauthor: boolean;
      };
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string | null;
    refreshToken?: string | null;
    expiresIn?: string | null;
    roles: {
      isTeacher: boolean;
      isAuthor: boolean;
      isCoauthor: boolean;
    };
  }
}
