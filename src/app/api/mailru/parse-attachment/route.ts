import { NextResponse } from 'next/server';
import fse from 'fs-extra';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';
import downloadAttachment from '~lib/mailru/downloadAttachment';
import { convertXlsToCsv } from '~utils/file-converters';
import { chatgpt } from '~lib/openai/apiReq';
import { getParseInvoicePrompt } from '~lib/openai/prompts';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { letterSeq, bodyStructurePart, fileName, provider } = await req.json();

  await downloadAttachment(letterSeq, bodyStructurePart, fileName);

  if (!fse.pathExistsSync(`${ATTACHMENTS_FOLDER_PATH}/${fileName}`)) {
    throw new Error('File not found');
  }

  const invoice = convertXlsToCsv(`${ATTACHMENTS_FOLDER_PATH}/${fileName}`);

  const assistantMessage = await chatgpt(
    getParseInvoicePrompt(provider, invoice)
  );

  return NextResponse.json(JSON.parse(assistantMessage));
}
