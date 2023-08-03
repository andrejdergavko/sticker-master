import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { getAttachments } from '~services/mailru/getAttachments';
import { authOptions } from '~api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user.email || !session.user.imapAccessToken) {
      throw new Error('User is not authenticated.');
    }

    const result = await getAttachments(
      session.user.email,
      session.user.imapAccessToken
    );

    return NextResponse.json(result);
  } catch (e: any) {
    return NextResponse.json(
      `An error occurred while fetching the attachments. Error: ${e?.message}`,
      { status: 500 }
    );
  }
}
