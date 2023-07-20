import xlsx from 'xlsx';
import fs from 'fs';
import iconv from 'iconv-lite';

export const convertFileToString = (path: string): string => {
  const extension = path.split('.').pop();

  if (extension === 'xls') {
    return convertXlsToCsv(path);
  }

  if (extension === 'csv') {
    const data = fs.readFileSync(path);
    return iconv.decode(data, 'cp1251').toString();
  }

  return '';
};

export const convertXlsToCsv = (path: string): string => {
  const xlsFile = xlsx.readFile(path);
  const sheetValue = xlsFile.Sheets[xlsFile.SheetNames[0]];
  return xlsx.utils.sheet_to_csv(sheetValue);
};
