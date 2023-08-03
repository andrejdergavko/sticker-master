import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      image: string;
      name: string;
      imapAccessToken?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
    imapToken?: {
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
    };
  }
}
