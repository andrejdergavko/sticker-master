import { NextResponse } from 'next/server';

import downloadAttachment from '~lib/mailru/downloadAttachment';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { letterSeq, bodyStructurePart, fileName } = await req.json();

  await downloadAttachment(letterSeq, bodyStructurePart, fileName);

  return NextResponse.json(1);
}
