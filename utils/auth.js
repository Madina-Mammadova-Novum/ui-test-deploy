import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { ROUTES } from '@/lib';
import { login, refreshAccessToken } from '@/services';
import { store } from '@/store';
import { setRoleIdentity } from '@/store/entities/user/slice';

const updateSession = async ({ token }) => {
  try {
    const { data, error } = await refreshAccessToken({ token });

    if (error) {
      throw Error(error.message);
    }

    return tokenAdapter({ data });
  } catch (err) {
    return { token: null, error: err.message };
  }
};

export const AUTHCONFIG = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: `${process.env.NEXT_PUBLIC_URL}/${ROUTES.LOGIN}` },
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      async authorize(credentials) {
        const { data } = await login({ data: credentials });

        if (data) {
          // Any object returned will be saved in `user` property of the JWT
          return data;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return tokenAdapter({ data: user });
      }
      store.dispatch(setRoleIdentity(token?.role));

      if (Date.now() < token?.expires) {
        return Promise.resolve(token);
      }

      const refreshedToken = await updateSession({ token: token.refreshToken });
      return Promise.resolve(refreshedToken);

      // if (trigger === 'update') {
      //   return Promise.resolve(session);
      // }
    },
    async session({ session, token }) {
      return sessionAdapter({ session, token });
    },
  },
};
