import { ImapFlow } from 'imapflow'; //doc for imapflow https://imapflow.com/module-imapflow-ImapFlow.html
import { v4 as uuidv4 } from 'uuid';

import { getDateBeforeDays } from '~utils/date';
import { IAttachment } from '~app-types/entities';

import { getMassageAttachments } from './utils';
import { SUPPORTED_FILE_FORMATS } from '~lib/constants';
import { getFileFormatFromPath } from '~utils/files';

export const getAttachments = async (
  userEmail: string = process.env.USER_EMAIL as string,
  password: string = process.env.USER_PASSWORD as string,
  sinceDays: number = 30
) => {
  const client = new ImapFlow({
    host: 'imap.mail.ru',
    port: 993,
    secure: true,
    logger: false,
    auth: {
      user: userEmail,
      pass: password,
    },
  });

  await client.connect();
  let lock = await client.getMailboxLock('INBOX');

  const result: IAttachment[] = [];

  try {
    for await (let message of client.fetch(
      { since: getDateBeforeDays(sinceDays) },
      {
        bodyStructure: true,
        internalDate: true,
        envelope: true,
        uid: true,
      }
    )) {
      const attachments = getMassageAttachments(message);

      const allowedAttachments = attachments.filter((attachment) => {
        // @ts-ignore not correct dispositionParameters field type in MessageStructureObject
        const fileName = attachment.dispositionParameters.filename;
        return SUPPORTED_FILE_FORMATS.includes(
          getFileFormatFromPath(fileName) || ''
        );
      });

      allowedAttachments.forEach((attachment) => {
        result.push({
          id: uuidv4(),
          // @ts-ignore
          from: message.envelope.from[0],
          // @ts-ignore
          fileName: attachment.dispositionParameters.filename,
          // @ts-ignore not correct internalDate field type in MessageStructureObject
          date: message.internalDate,
          bodyStructurePart: attachment.part,
          letterUid: message.uid,
          letterSeq: message.seq,
          messageSubject: message.envelope.subject,
        });
      });
    }
  } finally {
    lock.release();
  }

  await client.logout();

  return result;
};
