import { ProviderEmails } from '~lib/constants';

export const getParseInvoicePrompt = (
  providerEmail: string,
  invoice: string
) => {
  const exampleJson = [
    {
      article: 'FK-24807818MPB',
      productName: 'Головка-бита SPLINE ударная M18,1/2',
      quantity: 2,
      price: 10,
      amount: 20,
    },
  ];

  if (providerEmail === ProviderEmails.ANDREI) {
    return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
  Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
  * article - product catalog number
  * productName - product name
  * quantity - quantity of products
  * price - product price
  * amount - product amount
  
  Example json: ${JSON.stringify(exampleJson)}
   
    
    This is an invoice:
    ${invoice}`;
  }

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
  Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
  * article - product catalog number
  * productName - product name
  * quantity - quantity of products
  * price - product price
  * amount - product amount
  
  Example json: ${JSON.stringify(exampleJson)}
   
    
    This is an invoice:
    ${invoice}`;
};
