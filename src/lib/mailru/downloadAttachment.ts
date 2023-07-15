import { ImapFlow } from 'imapflow';
import fs from 'fs';

import { ATTACHMENTS_FOLDER_PATH } from '~lib/constants';

const downloadAttachment = async (
  letterSeq: number,
  bodyStructurePart: string,
  fileName: string,
  userEmail: string = 'andrej94@list.ru',
  password: string = 'tjE4rYU5kjvRLsdb8fDQ'
) => {
  const client = new ImapFlow({
    host: 'imap.mail.ru',
    port: 993,
    secure: true,
    auth: {
      user: userEmail,
      pass: password,
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

    const filePath = `${ATTACHMENTS_FOLDER_PATH}/${fileName}`;

    if (!fs.existsSync(ATTACHMENTS_FOLDER_PATH)) {
      fs.mkdirSync(ATTACHMENTS_FOLDER_PATH);
    }

    const stream = fs.createWriteStream(filePath);

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
