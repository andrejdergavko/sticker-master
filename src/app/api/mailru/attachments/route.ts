import { NextResponse } from 'next/server';

import { getAttachments } from '~lib/mailru/getAttachments';

export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getAttachments();

  return NextResponse.json(result);
}
