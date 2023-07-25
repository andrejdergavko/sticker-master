import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface IForsageProduct {
  article: string;
  productName: string;
  quantity: number;
  price: number;
  amount: number;
}

export const getForsagePrompt = (invoice: string) => {
  const exampleJson: IForsageProduct[] = [
    {
      article: 'FK-24807818MPB',
      productName: 'Головка-бита SPLINE ударная M18,1/2',
      quantity: 2,
      price: 10,
      amount: 20,
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
    * article - product catalog number (data is in the "Артикул" column)
    * productName - product name (data is in the "Наименование товара" column)
    * quantity - quantity of products (data is in the "Кол-во" column)
    * price - product price (data is in the "Цена" column)
    * amount - product amount (data is in the "Сумма" column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const forsageProductsToAppProducts = (
  forsageProducts: IForsageProduct[]
): IProduct[] => {
  return forsageProducts.map((forsageProduct) => ({
    ...forsageProduct,
    id: uuidv4(),
  }));
};
