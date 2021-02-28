import NextAuth, { InitOptions } from 'next-auth';
import Providers from 'next-auth/providers';

const options: InitOptions = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: 'read:user',
    }),
  ],
  pages: {
    error: '/',
  },
};

export default (req, res) => NextAuth(req, res, options);
