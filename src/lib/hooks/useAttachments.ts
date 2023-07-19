import useSwr, { SWRConfiguration } from 'swr';

import { IAttachment } from '~app-types/entities';

const useAttachments = (config?: SWRConfiguration) => {
  const { data, error, isLoading } = useSwr<IAttachment[]>(
    '/api/mailru/attachments',
    async (url: string) => {
      const res = await fetch(url, { cache: 'no-store' });

      if (!res.ok) {
        const errorMessage = await res.json();
        throw new Error(errorMessage);
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
