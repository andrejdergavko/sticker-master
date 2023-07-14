import type { FetchMessageObject, MessageStructureObject } from 'imapflow';

export const getMassageAttachments = (message: FetchMessageObject) => {
  const childNodes = message?.bodyStructure?.childNodes || [];

  const findAttachments = (childNodes: MessageStructureObject[]) => {
    let result: MessageStructureObject[] = [];

    childNodes.forEach((item) => {
      if (item.disposition === 'attachment') {
        result.push(item);
      }

      if (item.childNodes) {
        result.concat(findAttachments(item.childNodes));
      }
    });

    return result;
  };

  return findAttachments(childNodes);
};
