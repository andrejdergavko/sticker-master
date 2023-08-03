import NextAuth, { AuthOptions } from 'next-auth';
import MailRuProvider from 'next-auth/providers/mailru';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/signin',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    MailRuProvider({
      id: 'mailru',
      clientId: process.env.MAILRU_CLIENT_ID as string,
      clientSecret: process.env.MAILRU_CLIENT_SECRET as string,
      userinfo: {
        request: async (context) => {
          return await fetch(
            `https://oauth.mail.ru/userinfo?access_token=${context.tokens.access_token}`
          ).then((res) => res.json());
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.imapToken = {
          refreshToken: account.refresh_token as string,
          accessToken: account.access_token as string,
          expiresAt: account.expires_at as number,
        };
      }

      if (token.imapToken && Number(token.imapToken.expiresAt) < Date.now()) {
        // accessToken is expired
        try {
          const newToken = await fetch('https://oauth.mail.ru/token', {
            method: 'POST',
            body: new URLSearchParams({
              grant_type: 'refresh_token',
              client_id: process.env.MAILRU_CLIENT_ID as string,
              refresh_token: token.imapToken.refreshToken,
            }),
          }).then((res) => res.json());

          token.imapToken = {
            refreshToken: token.imapToken.refreshToken,
            accessToken: newToken.access_token,
            expiresAt: Date.now() + newToken.expires_in * 1000,
          };
        } catch (error) {
          console.error('Fail to refresh access token');
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.imapAccessToken = token.imapToken?.accessToken;
      return session;
    },
  },
};

// @ts-ignore type bug in @auth/prisma-adapter
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
