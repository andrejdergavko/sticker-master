import { NextResponse } from 'next/server';

import { getAttachments } from '~services/mailru/getAttachments';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await getAttachments();

    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      'An error occurred while fetching the attachments',
      {
        status: 500,
      }
    );
  }
}
