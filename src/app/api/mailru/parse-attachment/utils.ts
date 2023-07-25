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
import {
  forsageProductsToAppProducts,
  getForsagePrompt,
} from '~lib/providers/forsage';
import {
  bugautohitProductsToAppProducts,
  getBugautohitPrompt,
} from '~lib/providers/bugautohit';
import {
  lautoProductsToAppProducts,
  getLautoPrompt,
} from '~lib/providers/lauto';
import {
  almikProductsToAppProducts,
  getAlmikPrompt,
} from '~lib/providers/almik';

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
  if (providerEmail === ProviderEmails.FORSAGE) {
    return forsageProductsToAppProducts(providerProducts);
  }
  if (providerEmail === ProviderEmails.BUGAUTOHIT) {
    return bugautohitProductsToAppProducts(providerProducts);
  }
  if (providerEmail === ProviderEmails.LAUTO) {
    return lautoProductsToAppProducts(providerProducts);
  }
  if (providerEmail === ProviderEmails.ALMIK) {
    return almikProductsToAppProducts(providerProducts);
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
  if (providerEmail === ProviderEmails.FORSAGE) {
    return getForsagePrompt(invoice);
  }
  if (providerEmail === ProviderEmails.BUGAUTOHIT) {
    return getBugautohitPrompt(invoice);
  }
  if (providerEmail === ProviderEmails.LAUTO) {
    return getLautoPrompt(invoice);
  }
  if (providerEmail === ProviderEmails.ALMIK) {
    return getAlmikPrompt(invoice);
  }

  return getDefaultPrompt(invoice);
};

export const getProductsFromInvoice = async (
  invoice: string,
  providerEmail: string
) => {
  const prompt = getParseInvoicePrompt(providerEmail, invoice);
  const assistantMessage = await chatgpt(prompt);

  console.log('assistantMessage', assistantMessage); // <--

  const providerProducts = JSON.parse(assistantMessage);

  console.log('providerProducts', providerProducts); // <--

  return getAppProducts(providerProducts, providerEmail);
};
