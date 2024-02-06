// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    image: string;
    email: string;
    roles: {
      isAuthor: boolean;
      isTeacher: boolean;
      isCoauthor: boolean;
    };

    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    name: string;
    email: string;
    picture: string;
    roles: {
      isAuthor: boolean;
      isTeacher: boolean;
      isCoauthor: boolean;
    };

    accessToken: string;
    refreshToken: string;
    expiresIn: string;
  }
}
