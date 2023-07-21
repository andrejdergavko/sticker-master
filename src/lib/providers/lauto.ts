import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface ILautoProduct {
  article: string;
  productName: string;
  quantity: number;
  amount: number;
  amountWithVat: number;
}

export const getLautoPrompt = (invoice: string) => {
  const exampleJson: ILautoProduct[] = [
    {
      article: 'DBP1323',
      productName: 'комплект колодок для дисковых тормозов',
      quantity: 2,
      amount: 153.25,
      amountWithVat: 183.9,
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
    * article - product catalog number (data is in the "Артикул" column)
    * productName - product name (data is in the "Наименование" column)
    * quantity - quantity of products (data is in the "Количество" column)
    * amount - product amount (data is in the "Стоимость" column)
    * amountWithVat - product amount with VAT (data is in the "Сумма с НДС" column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const lautoProductsToAppProducts = (
  lautoProducts: ILautoProduct[]
): IProduct[] => {
  return lautoProducts.map((lautoProduct) => {
    return {
      id: uuidv4(),
      article: lautoProduct.article,
      productName: lautoProduct.productName,
      quantity: lautoProduct.quantity,
      price: Number(
        (lautoProduct.amountWithVat / lautoProduct.quantity).toFixed(2)
      ),
      amount: lautoProduct.amountWithVat,
    };
  });
};
