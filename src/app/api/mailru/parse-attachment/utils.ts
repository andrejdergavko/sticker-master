import { ProviderEmails } from '~lib/constants';
import { IProduct } from '~app-types/entities';
import { chatgpt } from '~services/openai/apiReq';
import {
  arclowProductsToAppProducts,
  getArclowPrompt,
} from '~lib/providers/arclow';
import {
  getDefaultPrompt,
  defaultProductsToAppProducts,
} from '~lib/providers/default';
import {
  getUssrautoPrompt,
  ussrautoProductsToAppProducts,
} from '~lib/providers/ussrauto';

const getAppProducts = (
  providerProducts: any,
  providerEmail: string
): IProduct[] => {
  if (providerEmail === ProviderEmails.ARCLOW) {
    return arclowProductsToAppProducts(providerProducts);
  }
  if (providerEmail === ProviderEmails.USSRAUTO) {
    return ussrautoProductsToAppProducts(providerProducts);
  }

  return defaultProductsToAppProducts(providerProducts);
};

const getParseInvoicePrompt = (providerEmail: string, invoice: string) => {
  if (providerEmail === ProviderEmails.ARCLOW) {
    return getArclowPrompt(invoice);
  }

  if (providerEmail === ProviderEmails.USSRAUTO) {
    return getUssrautoPrompt(invoice);
  }

  return getDefaultPrompt(invoice);
};

export const getProductsFromInvoice = async (
  invoice: string,
  providerEmail: string
) => {
  const prompt = getParseInvoicePrompt(providerEmail, invoice);
  const assistantMessage = await chatgpt(prompt);
  const providerProducts = JSON.parse(assistantMessage);

  return getAppProducts(providerProducts, providerEmail);
};
