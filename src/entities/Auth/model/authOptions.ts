import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { Login } from '../libs/Login';
import { VerifyRegistration } from '../libs/VerifyRegistration';
import { refreshAccessToken } from '../libs/refreshAccessToken';

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
        if (!credentials) {
          return null;
        }
        const response = await Login(credentials);

        if (!response) {
          return null;
        }

        return {
          // User data
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          image: response.user.avatar,
          roles: response.user.roles,
          // Tokens
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
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
        if (!credentials) {
          return null;
        }
        const response = await VerifyRegistration(credentials);

        if (!response) {
          return null;
        }

        return {
          // User data
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          image: response.user.avatar,
          roles: response.user.roles,
          // Tokens
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          expiresIn: response.expiresIn,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === 'update') {
        return { ...token, ...session };
      }
      if (user) {
        return {
          ...token,
          sub: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          roles: user.roles,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresIn: user.expiresIn,
        };
      }

      if (new Date() < new Date(token.expiresIn)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ token, session }) {
      session.user.accessToken = token.accessToken;
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
