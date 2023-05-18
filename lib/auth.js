import CredentialsProvider from 'next-auth/providers/credentials';

// import { login } from '@/services';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login',
      type: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        // const response = await login({ data: credentials });

        /* Draf solution */
        const fd = new URLSearchParams();
        fd.append('grant_type', process.env.IDENTITY_API_GRANT_TYPE);
        fd.append('client_id', process.env.IDENTITY_API_CLIENT_ID);
        fd.append('client_secret', process.env.IDENTITY_API_CLIENT_SECRET);
        fd.append('username', credentials.email);
        fd.append('password', credentials.password);

        const res = await fetch('https://shiplink-id.azurewebsites.net/connect/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: fd.toString(),
        });

        const user = await res.json();

        if (user) return user;

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
