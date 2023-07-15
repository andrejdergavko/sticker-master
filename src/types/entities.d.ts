export interface IProduct {
  uuid: string;
  description: string;
  amount: number;
  provider: string;
}

interface IAttachment {
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
