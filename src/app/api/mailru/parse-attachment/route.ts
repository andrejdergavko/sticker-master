import { NextResponse } from 'next/server';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';
import downloadAttachment from 'src/services/mailru/downloadAttachment';
import { convertFileToString } from '~utils/file-converters';

import { getProductsFromInvoice } from './utils';

export const dynamic = 'force-dynamic';

export type ParseAttachmentArgsT = {
  letterSeq: number;
  bodyStructurePart: string;
  fileName: string;
  providerEmail: string;
};

export async function POST(req: Request) {
  try {
    const {
      letterSeq,
      bodyStructurePart,
      fileName,
      providerEmail,
    }: ParseAttachmentArgsT = await req.json();

    const filePath = `${ATTACHMENTS_FOLDER_PATH}/${fileName}`;

    await downloadAttachment(letterSeq, bodyStructurePart, fileName);

    const invoice: string = convertFileToString(filePath);

    const products = await getProductsFromInvoice(invoice, providerEmail);

    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json(e?.message, { status: 500 });
  }
}
