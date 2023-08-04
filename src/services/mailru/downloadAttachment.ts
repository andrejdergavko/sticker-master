import { ImapFlow } from 'imapflow';
import fse from 'fs-extra';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';

const downloadAttachment = async (
  letterSeq: number,
  bodyStructurePart: string,
  fileName: string,
  email: string,
  accessToken: string
) => {
  const client = new ImapFlow({
    host: 'imap.mail.ru',
    port: 993,
    secure: true,
    auth: {
      user: email,
      accessToken,
    },
    logger: false,
  });

  await client.connect();
  let lock = await client.getMailboxLock('INBOX');

  try {
    let { meta, content } = await client.download(
      String(letterSeq),
      bodyStructurePart
    );

    if (!content) {
      throw new Error('File not found');
    }

    const filePath = `${ATTACHMENTS_FOLDER_PATH}/${fileName}`;

    if (!fse.existsSync(ATTACHMENTS_FOLDER_PATH)) {
      fse.mkdirSync(ATTACHMENTS_FOLDER_PATH);
    }

    const stream = fse.createWriteStream(filePath);

    content.pipe(stream);

    stream.on('finish', () => {
      console.log('File downloaded successfully');
    });

    stream.on('error', (err) => {
      throw new Error(`Failed to download file. Error message: ${err.message}`);
    });
  } finally {
    lock.release();
  }

  await client.logout();
};

export default downloadAttachment;
