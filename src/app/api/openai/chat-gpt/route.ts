import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { chatgpt } from '~services/openai/apiReq';
import { authOptions } from '~api/auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email || !session.user.imapAccessToken) {
    throw new Error('User is not authenticated.');
  }

  try {
    const { message } = await req.json();
    const assistantMessage = await chatgpt(message);
    return NextResponse.json(assistantMessage);
  } catch (error) {
    return NextResponse.json('ChatGPT error', { status: 500 });
  }
}
