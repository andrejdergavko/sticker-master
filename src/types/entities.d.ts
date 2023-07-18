export interface IProduct {
  uuid: string;
  description: string;
  amount: number;
  provider: string;
}

export interface IAttachment {
  uuid: string;
  from: {
    name: string;
    address: string;
  };
  fileName: string;
  date: string;
  bodyStructurePart: string;
  letterUid: number;
  letterSeq: number;
}

export interface IProduct {
  uuid: string;
  article?: string;
  productName: string;
  quantity: number;
  price: number;
  amount: number;
}
