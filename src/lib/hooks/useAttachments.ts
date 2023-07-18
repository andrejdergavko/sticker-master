import useSwr, { SWRConfiguration } from 'swr';

import { IAttachment } from '~app-types/entities';

const useAttachments = (config?: SWRConfiguration) => {
  const { data, error, isLoading } = useSwr<IAttachment[]>(
    '/api/mailru/attachments',
    async (url: string) => {
      const res = await fetch(url, { cache: 'no-store' });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message);
      }

      return res.json();
    },
    config
  );

  return {
    attachments: data,
    isLoading,
    error,
  };
};

export default useAttachments;
