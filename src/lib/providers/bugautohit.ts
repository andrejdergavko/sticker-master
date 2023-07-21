import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface IBugautohitProduct {
  productName: string;
  quantity: number;
  amount: number;
  amountWithVat: number;
}

export const getBugautohitPrompt = (invoice: string) => {
  const exampleJson = [
    {
      productName: '90764, 449 Lada эмаль акр. Optic 2K 0,8л, гр.',
      quantity: 2,
      amount: 153.25,
      amountWithVat: 183.9,
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
    * productName - product name (data is in the "Товар" column)
    * quantity - quantity of products (data is in the "Кол-во" column)
    * amount - product amount (data is in the "Сумма, руб., коп." column)
    * amountWithVat - product amount with VAT (data is in the "Сумма с НДС, руб., коп." column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const bugautohitProductsToAppProducts = (
  bugautohitProducts: IBugautohitProduct[]
): IProduct[] => {
  return bugautohitProducts.map((bugautohitProduct) => {
    return {
      id: uuidv4(),
      productName: bugautohitProduct.productName,
      quantity: bugautohitProduct.quantity,
      price: Number(
        (bugautohitProduct.amountWithVat / bugautohitProduct.quantity).toFixed(
          2
        )
      ),
      amount: bugautohitProduct.amountWithVat,
    };
  });
};
