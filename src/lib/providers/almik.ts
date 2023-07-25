import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface IAlmikProduct {
  productName: string;
  quantity: number;
  amount: number;
  amountWithVat: number;
}

export const getAlmikPrompt = (invoice: string) => {
  const exampleJson: IAlmikProduct[] = [
    {
      productName:
        'Вал распределительный 2101-07,2121 в сб (ОАО "АВТОВАЗ") фирм.упак.',
      quantity: 2,
      amount: 153.25,
      amountWithVat: 183.9,
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. If the product name has quotation marks, add / in front of it. Each product mast have the following fields: 
    * productName - product name (data is in the "Наименование товара" column)
    * quantity - quantity of products (data is in the "Кол-во" column)
    * amount - product amount (data is in the "Стоимость, руб.коп." column)
    * amountWithVat - product amount with VAT (data is in the "Стоимость с НДС, руб.коп." column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const almikProductsToAppProducts = (
  almikProducts: IAlmikProduct[]
): IProduct[] => {
  return almikProducts.map((almikProduct) => {
    return {
      id: uuidv4(),
      productName: almikProduct.productName,
      quantity: almikProduct.quantity,
      price: Number(
        (almikProduct.amountWithVat / almikProduct.quantity).toFixed(2)
      ),
      amount: almikProduct.amountWithVat,
    };
  });
};
