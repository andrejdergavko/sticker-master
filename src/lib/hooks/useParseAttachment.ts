import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ParseAttachmentArgsT } from '~api/mailru/parse-attachment/route';
import { IProduct } from '~app-types/entities';

const useParseAttachment = (
  config?: SWRMutationConfiguration<
    IProduct[],
    any,
    string,
    ParseAttachmentArgsT
  >
) => {
  const { trigger, data, error, isMutating } = useSWRMutation<
    IProduct[],
    any,
    string,
    ParseAttachmentArgsT
  >(
    '/api/mailru/parse-attachment',
    async (url: string, { arg }: { arg: ParseAttachmentArgsT }) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(arg),
        cache: 'no-store',
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage);
      }

      return await res.json();
    },
    config
  );

  return {
    parseAttachment: trigger,
    products: data,
    isParsing: isMutating,
    error,
  };
};

export default useParseAttachment;
