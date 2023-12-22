import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Login } from '../libs/Login';
import { VerifyRegistration } from '../libs/VerifyRegistration';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    newUser: '/registration',
    verifyRequest: '/registration/verify',
  },

  providers: [
    Credentials({
      id: 'login',
      name: 'login',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const response = await Login(credentials);

        if (typeof response === 'string') return null;

        return {
          email: response.user.email,
          name: response.user.name,
          id: response.user.id,
          image: response.user.avatar,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
          roles: { ...response.user.roles },
        };
      },
    }),
    Credentials({
      id: 'verifyRegistration',
      name: 'verifyRegistration',
      credentials: {
        email: {},
        verificationCode: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const response = await VerifyRegistration(credentials);

        if (typeof response === 'string') return null;

        return {
          email: response.user.email,
          name: response.user.name,
          id: response.user.id,
          image: response.user.avatar,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
          roles: { ...response.user.roles },
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === 'update') {
        if (!session) return token;
        return {
          ...token,
          ...session,
        };
      }
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = user.expiresIn;
        token.roles = { ...user.roles };
      }
      return token;
    },
    async session({ token, session }) {
      session.user.accessToken = token.accessToken || null;
      session.user.refreshToken = token.refreshToken;
      session.user.expiresIn = token.expiresIn;
      session.user.roles = { ...token.roles };
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
