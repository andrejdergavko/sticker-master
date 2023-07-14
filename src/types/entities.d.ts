interface IAttachment {
  from: {
    name: string;
    address: string;
  };
  fileName: string;
  date: Date;
  bodyStructurePart: string;
  letterUid: number;
  letterSeq: number;
}
