import { NextResponse } from 'next/server';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';
import downloadAttachment from '~lib/mailru/downloadAttachment';
import { convertXlsToCsv } from '~utils/file-converters';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { letterSeq, bodyStructurePart, fileName } = await req.json();

  await downloadAttachment(letterSeq, bodyStructurePart, fileName);

  const csv = convertXlsToCsv(`${ATTACHMENTS_FOLDER_PATH}/${fileName}`);

  return NextResponse.json(1);
}
