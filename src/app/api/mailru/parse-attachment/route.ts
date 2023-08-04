import fse from 'fs-extra';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';
import downloadAttachment from 'src/services/mailru/downloadAttachment';
import { convertFileToString } from '~utils/file-converters';
import { authOptions } from '~api/auth/[...nextauth]/route';

import { getProductsFromInvoice } from './utils';

export const dynamic = 'force-dynamic';

export type ParseAttachmentArgsT = {
  letterSeq: number;
  bodyStructurePart: string;
  fileName: string;
  providerEmail: string;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.email || !session.user.imapAccessToken) {
    throw new Error('User is not authenticated.');
  }

  try {
    const {
      letterSeq,
      bodyStructurePart,
      fileName,
      providerEmail,
    }: ParseAttachmentArgsT = await req.json();

    const filePath = `${ATTACHMENTS_FOLDER_PATH}/${fileName}`;

    await downloadAttachment(
      letterSeq,
      bodyStructurePart,
      fileName,
      session.user.email,
      session.user.imapAccessToken
    );

    const invoice: string = convertFileToString(filePath);

    fse.emptyDirSync(ATTACHMENTS_FOLDER_PATH);

    const products = await getProductsFromInvoice(invoice, providerEmail);

    return NextResponse.json(products);
  } catch (e: any) {
    return NextResponse.json(e?.message, { status: 500 });
  }
}
