export interface IAttachment {
  id: string;
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
  id: string;
  article?: string;
  productName: string;
  quantity: number;
  price: number;
  amount: number;
}
