import { NextResponse } from 'next/server';
import { chatgpt } from 'src/services/openai/apiReq';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const assistantMessage = await chatgpt(message);
    return NextResponse.json(assistantMessage);
  } catch (error) {
    return NextResponse.json('ChatGPT error', { status: 500 });
  }
}
