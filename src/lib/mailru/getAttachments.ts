import { ImapFlow } from 'imapflow'; //doc for imapflow https://imapflow.com/module-imapflow-ImapFlow.html

import { getDateBeforeDays } from '~utils/date';
import { IAttachment } from '~app-types/entities';

import { getMassageAttachments } from './utils';

export const getAttachments = async (
  userEmail: string = 'andrej94@list.ru',
  password: string = 'tjE4rYU5kjvRLsdb8fDQ',
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

      attachments.forEach((attachment) => {
        result.push({
          id: attachment.id,
          // @ts-ignore
          from: message.envelope.from[0],
          // @ts-ignore not correct dispositionParameters field type in MessageStructureObject
          fileName: attachment.dispositionParameters.filename,
          // @ts-ignore not correct internalDate field type in MessageStructureObject
          date: message.internalDate,
          bodyStructurePart: attachment.part,
          letterUid: message.uid,
          letterSeq: message.seq,
        });
      });
    }
  } finally {
    lock.release();
  }

  await client.logout();

  return result;
};
