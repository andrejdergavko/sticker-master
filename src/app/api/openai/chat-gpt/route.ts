import { NextResponse } from 'next/server';
import { chatgpt } from '~lib/openai/apiReq';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { message } = await req.json();

  const assistantMessage = await chatgpt(message);

  return NextResponse.json(assistantMessage);
}
