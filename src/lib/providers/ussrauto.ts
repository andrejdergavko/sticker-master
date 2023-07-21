import { v4 as uuidv4 } from 'uuid';

import { IProduct } from '~app-types/entities';

interface IUssrautoProduct {
  productName: string;
  quantity: number;
  amount: number;
  amountWithVat: number;
}

export const getUssrautoPrompt = (invoice: string) => {
  const exampleJson = [
    {
      productName:
        'Сцепление в сборе ГАЗ дв.406 Начало / 406-1601000 / 4063-1601090 [41517] Россия',
      quantity: 2,
      amount: 153.25,
      amountWithVat: 183.9,
    },
  ];

  return `I have an invoice in csv format. Extract the commodity items from it and return them in JSON format.
    Your message should only contain JSON, no words. This JSON mast be read by JSON.parse method. Each product mast have the following fields: 
    * productName - product name (data is in the "Наименование товара" column)
    * quantity - quantity of products (data is in the "Коли-чество" column)
    * amount - product amount (data is in the "Стоимость, руб. коп" column)
    * amountWithVat - product amount with VAT (data is in the "Стоимость с НДС, руб. коп." column)
    
    Example json: ${JSON.stringify(exampleJson)}
     
      
      This is an invoice:
      ${invoice}`;
};

export const ussrautoProductsToAppProducts = (
  ussrautoProducts: IUssrautoProduct[]
): IProduct[] => {
  return ussrautoProducts.map((ussrautoProduct) => {
    return {
      id: uuidv4(),
      productName: ussrautoProduct.productName,
      quantity: ussrautoProduct.quantity,
      price: Number(
        (ussrautoProduct.amountWithVat / ussrautoProduct.quantity).toFixed(2)
      ),
      amount: ussrautoProduct.amountWithVat,
    };
  });
};
