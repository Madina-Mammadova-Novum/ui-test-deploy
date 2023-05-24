import Credentials from 'next-auth/providers/credentials';

import { sessionAdapter, tokenAdapter } from '@/adapters/user';
import { login } from '@/services';

export const AUTHCONFIG = {
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
  jwt: async ({ token, user }) => {
    if (user) return tokenAdapter({ data: user });

    if (Date.now() < token.accessTokenExpires) return token;

    return null;
  },
  session: async ({ session, token }) => {
    // setTimeout(async () => {
    //   const data = await refreshAccessToken(token);

    //   return sessionAdapter({ session, token: data });
    // }, 1000);

    return sessionAdapter({ session, token });
  },
};
