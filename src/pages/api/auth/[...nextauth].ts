import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

// Extend the Session type to include accessToken
declare module 'next-auth' {
  interface Session {
    accessToken?: string;
  }
  interface JWT {
    accessToken?: string;
  }
}

// This is a basic setup that you'll need to expand based on your requirements
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      // LinkedIn Provider
      {
        id: 'linkedin',
        name: 'LinkedIn',
        type: 'oauth',
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        authorization: {
          url: 'https://www.linkedin.com/oauth/v2/authorization',
          params: { scope: 'r_liteprofile r_emailaddress w_member_social' },
        },
        token: 'https://www.linkedin.com/oauth/v2/accessToken',
        userinfo: 'https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))',
        profile(profile) {
          return {
            id: profile.id,
            name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
            email: null, // LinkedIn doesn't provide email in this endpoint
            image: profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier,
          };
        },
      },
      // Add other providers (Twitter, Instagram) similarly
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account?.access_token) {
          token.accessToken = account.access_token as string;
        }
        return token;
      },
      async session({ session, token }) {
        if (token.accessToken) {
          session.accessToken = token.accessToken as string;
        }
        return session;
      },
    },
    // Enable debug mode in development
    debug: process.env.NODE_ENV === 'development',
  });
}
