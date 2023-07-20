import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface IArclowProduct {
  productName: string;
  article: string;
  quantity: number;
  amount: number;
  article2: string;
}

export const getArclowPrompt = (invoice: string) => {
  const exampleJson = [
    {
      productName: 'Замок зажигания ВАЗ-2101-07',
      article: '2101-3906020-16',
      quantity: 2,
      amount: 20,
      article2: 'RR14919',
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
    * productName - product name (data is in the "Наименование" column)
    * article - product catalog number (data is in the "Артикул" column)
    * quantity - quantity of products (data is in the "Количество" column)
    * amount - product amount (data is in the "Сумма" column)
    * article2 - product catalog number (data is in the "Артикул 2" column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const arclowProductsToAppProducts = (
  arclowProduct: IArclowProduct[]
): IProduct[] => {
  return arclowProduct.map((arclowProduct) => {
    return {
      id: uuidv4(),
      article: `${arclowProduct.article}/${arclowProduct.article2}`,
      productName: arclowProduct.productName,
      quantity: arclowProduct.quantity,
      price: Number((arclowProduct.amount / arclowProduct.quantity).toFixed(2)),
      amount: arclowProduct.amount,
    };
  });
};
