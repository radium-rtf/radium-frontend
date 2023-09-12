import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Login, LoginRequestDto } from '@/entities/Auth';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { type: 'email', placeholder: 'Email', label: 'Email' },
        password: {
          type: 'password',
          placeholder: 'password',
          label: 'password',
        },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;
        const response = await Login(credentials);

        if (typeof response === 'string') return null;

        return {
          email: response.user.email,
          name: response.user.name,
          id: response.user.id,
          image: response.user.avatar,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
