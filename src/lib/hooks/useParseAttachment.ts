import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation';

import { ParseAttachmentArgsT } from '~api/mailru/parse-attachment/route';
import { IProduct } from '~app-types/entities';

import { useProductsStore } from 'src/store/products';

const useParseAttachment = (
  config?: SWRMutationConfiguration<
    IProduct[],
    any,
    string,
    ParseAttachmentArgsT
  >
) => {
  const { setProducts } = useProductsStore();

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
        const error = await res.json();
        throw new Error(error?.message);
      }

      return await res.json();
    },
    {
      ...config,
      onSuccess(data, key, config) {
        setProducts(data);
        config.onSuccess && config.onSuccess(data, key, config);
      },
    }
  );

  return {
    parseAttachment: trigger,
    products: data,
    isParsing: isMutating,
    error,
  };
};

export default useParseAttachment;
