import { NextResponse } from 'next/server';
import fse from 'fs-extra';
import { v4 as uuidv4 } from 'uuid';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';
import downloadAttachment from '~lib/mailru/downloadAttachment';
import { convertXlsToCsv } from '~utils/file-converters';
import { chatgpt } from '~lib/openai/apiReq';
import { getParseInvoicePrompt } from '~lib/openai/prompts';
import { IProduct } from '~app-types/entities';

export const dynamic = 'force-dynamic';

export type ParseAttachmentArgsT = {
  letterSeq: number;
  bodyStructurePart: string;
  fileName: string;
  provider: string;
};

export async function POST(req: Request) {
  const {
    letterSeq,
    bodyStructurePart,
    fileName,
    provider,
  }: ParseAttachmentArgsT = await req.json();
  const filePath = `${ATTACHMENTS_FOLDER_PATH}/${fileName}`;

  await downloadAttachment(letterSeq, bodyStructurePart, fileName);

  if (!fse.pathExistsSync(filePath)) {
    return NextResponse.json('Failed to download file', { status: 500 });
  }

  const invoice = convertXlsToCsv(filePath);

  if (!invoice) {
    return NextResponse.json('Failed to convert file', { status: 500 });
  }

  const assistantMessage = await chatgpt(
    getParseInvoicePrompt(provider, invoice)
  );

  const chatGPTResponse = JSON.parse(assistantMessage);

  if (!Array.isArray(chatGPTResponse)) {
    return NextResponse.json(
      'Invalid ChatGPT response. Response is not an array',
      { status: 500 }
    );
  }

  const products: IProduct[] = chatGPTResponse.map((product) => ({
    ...product,
    id: uuidv4(),
  }));

  return NextResponse.json(products);
}
